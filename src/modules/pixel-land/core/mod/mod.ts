import { nanoid } from "nanoid";
import { API } from "../../../../constants/api";
import { API_URL } from "../../../../constants/config";
import ModBase from "../base/mod-base";
import ModInfo from "../models/mod-info";
import pixelApi from "../../../../shared/http/pixelApi";
import makeUrl from "../utils/make-url";
import ModShared from "./mod-shared";

class Mods {
    mods: {
        [key: string]: ModBase
    } = {};
    mods_names: string[] = [];
    mods_info: {
        [key: string]: ModInfo
    } = {}

    isLoaded = false;
    async mounted() {
        await this.loadServerMods();
    }
    getMods() {
        return this.mods;
    }
    getModsIds() {
        return this.mods_names;
    }
    reOrder() {
        this.mods_names.sort((a, b) => {
            return (this.mods[a]?.priority ?? 1) - (this.mods[b]?.priority ?? 1);
        });
    }
    async removeMod(id: string) {
        await this.mods[id].diposed();
        delete this.mods[id];
        this.mods_names = this.mods_names.filter(x => x !== id);
    }
    async addMod(name: string, mod: any) {
        mod.sid = nanoid(8);
        this.mods[name] = mod;
        this.mods_names.push(name);

        const pl_mod = new ModShared(name);
        const mounted_fn = this.mods[name].mounted;
        if (typeof mounted_fn === "function") {
            try{
                await this.mods[name].mounted(pl_mod);
            } catch (e) {
                console.error(`Error mounting mod: ${name}`, e);
            }
        }
    }
    async getModsList(): Promise<null | string[]> {
        return new Promise((resolve, reject) => {
            pixelApi.get(API.GET_MODS_LIST)
                .then((res: any) => {
                    if (res.data.ok) {
                        resolve(res.data.mods);
                    }
                })
                .catch(_ => {
                    reject(null);
                })
        })
    }
    async loadModInfo(name: string): Promise<null | ModInfo> {
        const url = makeUrl(API.MOD_INFO_FILE, { name });
        return new Promise((resolve, reject) => {
            pixelApi.get(url)
                .then((res: any) => {
                    resolve(res);
                })
                .catch(_ => {
                    reject();
                })
        })
    }
    async loadServerMods() {
        const mods = await this.getModsList();
        if (!mods) return;
        const loaded_mods = [];
        for (const mod of mods) {
            try {
                const _mod_instance = await this.loadModByUrl(`${API_URL}${makeUrl(API.MOD_CLIENT_FILE, { name: mod })}`);
                const info = await this.loadModInfo(mod);
                if (_mod_instance && info) {
                    loaded_mods.push({
                        name: mod,
                        info,
                        mod: _mod_instance
                    });
                }
            }
            catch (e) { }
        }
        for (const mod of loaded_mods) {
            this.mods_info[mod.name] = mod.info;
            const _maked_mod = new mod.mod();
            await this.addMod(mod.name, _maked_mod);
        }
        console.log(`Loaded ${loaded_mods.length} mods`);
        this.reOrder();
        this.isLoaded = true;
    }
    async loadModByUrl(url: string) {
        try {
            const mod = await import(url);

            if (mod.default) {
                return mod.default;
            }
            if (mod.Client) {
                return mod.Client;
            }
            throw new Error("Mod is not exported");
        } catch (e) {
            console.error(`Error loading mod from url: ${url}`, e);
        }
    }
    fixedUpdateMods() {
        if (!this.isLoaded) return;
        this.mods_names.forEach(name => {
            this.mods[name]?.fixedUpdate?.();
        })

    }
    updateMods() {
        if (!this.isLoaded) return;
        this.mods_names.forEach(name => {
            this.mods[name]?.update?.();
        })
    }
}
export default Mods;