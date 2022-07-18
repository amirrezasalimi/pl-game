import assetUrl from "../../../../shared/helpers/asset-url";
import { PL } from "../stage/pixel-land";
import ModWs from "./mod-ws";

class ModShared {
    sharedState: any = PL.sharedState;
    mod = PL.mod;
    ws: ModWs;
    vis = PL.vis;
    ctx = PL.ctx;
    assetUrl: (path: string) => string;
    constructor(name: string) {
        this.ws = new ModWs(name);
        this.assetUrl = (path: string) => assetUrl(name, path);

    }
}
export default ModShared;