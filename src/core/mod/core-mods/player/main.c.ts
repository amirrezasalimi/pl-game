import p5 from "p5";
import { ModClientBody } from "../../models/mod-client-base";
import info from "./info.json"

class PlayerClientMod extends ModClientBody {
    p5: p5;
    constructor() {
        super(info);

    }

    // this will call when mod mounted in client
    mounted() {
        if (this.util.core._p5) {
            this.p5 = this.util.core._p5;
        }
        this.registerEvents();


        this.util.core.global.players = [];
        this.util.core.global.players_cids = [];
        this.receiveAvailablePlayers();
    }

    registerEvents() {
        console.log("ClientMain.registerEvents()");
        if (this.util) {
            this.util.server.on(this.uid, "player:joined", (data: any) => {
                this.util.core.global.players.push({ ...data });
            })
            this.util.server.on(this.uid, "player:disconnect", (data: any) => {
                this.util.core.global.players = this.util?.core.global.players.filter((p: any) => p.id !== data.id);
            })
        }

    }
    receiveAvailablePlayers() {
        // emit event to server to get available players and fill global.players
    }
    draw(): void {
        const p5 = this.p5;
        p5.circle(100, 100, p5.frameCount % 100);
        // console.log("called every frame");

 
    }
    dispose(): void {
        console.log("called when mod gonna dispose from app");

    }


}
export default PlayerClientMod;