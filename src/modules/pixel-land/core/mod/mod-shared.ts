import { PL } from "../stage/pixel-land";
import ModWs from "./mod-ws";

class ModShared {
    sharedState: any = PL.sharedState;
    mod = PL.mod;
    ws: ModWs;
    vis=PL.vis;
    ctx=PL.ctx;
    
    constructor(name: string) {
        this.ws = new ModWs(name);
    }
} 
export default ModShared;