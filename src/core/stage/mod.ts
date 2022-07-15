import ModBase from "../base/mod-base";

class Mods {
    mods: {
        [key: string]: ModBase
    } = {};
    mods_names: string[] = [];

    getMods() {
        return this.mods;
    }
    getModsIds() {
        return this.mods_names;
    }
    reOrder() {
        this.mods_names.sort((a, b) => {
            return this.mods[a].priority - this.mods[b].priority;
        });
    }
    async removeMod(id: string) {
        await this.mods[id].diposed();
        delete this.mods[id];
        this.mods_names = this.mods_names.filter(x => x !== id);
    }
    async addMod(name: string, mod: any) {
        this.mods[name] = mod;
        this.mods_names.push(name);
        await this.mods[name].mounted();
    }
    async loadModFromServer(name: string) {


    }
    async loadModByUrl(url: string) {
        const mod = await import(url);
        if (mod.default) {
            const _mod=new mod.default();
            await this.addMod(mod.default.name, _mod);
        }
    }
    fixedUpdateMods() {
        this.mods_names.forEach(name => {
            this.mods[name]?.fixedUpdate?.();
        })
    }
    updateMods() {
        this.mods_names.forEach(name => {
            this.mods[name]?.update?.();
        })
    }
}
export default Mods;