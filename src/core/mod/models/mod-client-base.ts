import ModUtil from "../base/mod-util";
import ModInfo from "./mod-info";

export abstract class ModClientBody {
    uid: string;
    util: ModUtil;
    info: ModInfo;
    constructor(info: ModInfo) {
        this.info = info;
    }
    abstract mounted(): void;
    abstract draw(): void;
    abstract dispose(): void;
}