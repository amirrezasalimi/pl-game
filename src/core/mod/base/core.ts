import { nanoid } from "nanoid";
import p5 from "p5";
import { ModClientBody } from "../models/mod-client-base";
import ClientMod from "./client";
import ModUtil from "./mod-util";
import ServerMod from "./server";

class ModCore {
    _p5?: p5;
    mods: {
        [id: string]: ModClientBody
    } = {}
    mounted_mods_ids: string[] = [] 
    global: any = {}; // global state shared between mods
    util: ModUtil;

    constructor() {
        this.util = new ModUtil(this);
        this.util.client = new ClientMod()
        this.util.server = new ServerMod()
        this.util.core = this;
    }
    // 
    activeModIds() {
        return this.mounted_mods_ids;
    }
    registerMod(id: string, Mod: new () => ModClientBody) {

        if (this.mods[id]) {
            console.error(`mod ${id} already registered`);
            return false;
        }
        const _mod = new Mod();
        _mod.util = this.util;
        _mod.uid = nanoid(6);
        this.mods[_mod.info.id] = _mod;
        return true;
    }
    startMod = (id: string) => {
        const _mod = this.mods[id];
        console.log(`start mod ${id}`);


        _mod?.mounted();
        this.mounted_mods_ids.push(id);
        this.util.client.emit("core", "mod:mounted", _mod)
    }
    initMods() {
        const ids = Object.keys(this.mods);
        console.log("init mod", ids);

        ids.forEach(id => {
            
            this.startMod(id);
        })
    }
    unregisterMod(id: string) {
        const _mod = this.mods[id];

        // dispose listeners
        _mod?.dispose();
        delete this.mods[id];
    }
    modDraw() {
        this._p5?.background(255);
        this._p5?.push();
        const ids = this.activeModIds();
        ids.forEach(id => {
            this.mods[id]?.draw();
        })
        this._p5?.pop();
    }
}
export default ModCore;