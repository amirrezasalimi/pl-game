import Sockette from "sockette";
import { SERVER_WS } from "../../../../constants/config";
import { PL } from "../stage/pixel-land";

class WsHandler {
    client?: Sockette | null;
    ws_url: string;
    start() {
        this.ws_url = SERVER_WS;
        this.client = new Sockette(this.ws_url, {
            timeout: 3*1000,
            maxAttempts: 2,
            onopen: e => {
                console.log('WS connected');
                PL.ws.emitLocal("client:connect");
            },
            onmessage: e => {
                try {
                    let _data = JSON.parse(e.data) ?? {};
                    if (_data.name) {
                        PL.ws.emitLocal(_data.name, _data.data);
                    }
                } catch (e) {
                    console.log(e);
                }
            },
            onreconnect: e => console.log('Reconnecting...', e),
            onmaximum: e => console.log('Stop Attempting!', e),
            onclose: e => {
                PL.ws.emitLocal("client:disconnect");
            },
            onerror: e => console.log('Error:', e)
        });
    }
    init() {

    }
}
export default WsHandler;