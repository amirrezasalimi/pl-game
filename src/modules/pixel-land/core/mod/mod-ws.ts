import { PL } from "../stage/pixel-land";

class ModWs {
    mod_name: string;
    constructor(name: string) {
        this.mod_name = name;
    }
    on(event: string, cb: (data: any) => void) {
        return PL.ws.on(this.mod_name, event, cb);
    }
    emit(event: string, data: any = {}) {
        PL.ws.emit(event, data);
    }
    removeListener(event: string) {
        return PL.ws.removeSingle(event, this.mod_name);
    }
    removeAllListeners() {
        return PL.ws.remove(this.mod_name);
    }
}
export default ModWs;