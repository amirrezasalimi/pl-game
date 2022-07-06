import ClientMod from "./client";
import ModCore from "./core";
import ServerMod from "./server";

class ModUtil {
    core: ModCore
    server: ServerMod
    client: ClientMod

    constructor(core: ModCore) {
        this.core = core;

    }
}
export default ModUtil;