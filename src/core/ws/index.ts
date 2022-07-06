import Sockette from "sockette";
import { SERVER_WS } from "../../constants/config";

class WsHandler {
    client?: Sockette | null;
    ws_url: string;
    start() {
        this.ws_url = SERVER_WS;
        this.client = new Sockette(this.ws_url, {
            timeout: 5e3,
            maxAttempts: 10,
            onopen: e => console.log('Connected!', e),
            onmessage: e => console.log('Received:', e),
            onreconnect: e => console.log('Reconnecting...', e),
            onmaximum: e => console.log('Stop Attempting!', e),
            onclose: e => console.log('Closed!', e),
            onerror: e => console.log('Error:', e)
        });
    }
    init() {

    }
}
export default WsHandler;