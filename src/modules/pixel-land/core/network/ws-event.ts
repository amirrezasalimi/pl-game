import IWsEventInfo from "../models/ws-event-info";
import { PL } from "../stage/pixel-land";


class WsEvent {
    listeners: { [key: string]: IWsEventInfo[] } = {};
    on(origin_id: string, event: string, cb: (data: any) => void, middleware?: (event: string,data:any) => boolean) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push({
            origin_id,
            cb: cb,
            middleware,
        });
    }
    emitLocal(event: string, data?: any) {
        if (!this.listeners[event]) {
            return;
        }
       
        this.listeners[event].forEach(({ cb, middleware }) => {
            let canCall = true;
            if (typeof middleware === "function") {
                canCall = !middleware(event, data);
            } else {
                canCall = true;
            }
            canCall && cb(data);
        });
    }
    emit(event: string, data: any = {}) {
        try {
            PL.ws_handler.client?.send(JSON.stringify({
                name: event,
                data,
            }))
        }
        catch (e) {
            console.log(e);
        }
    }
    remove(origin_id: string) {
        for (const event in this.listeners) {
            this.listeners[event] = this.listeners[event].filter(({ origin_id: r }) => r !== origin_id);
        }
    }
    removeSingle(event: string, origin_id: string) {
        if (!this.listeners[event]) {
            return;
        }
        this.listeners[event] = this.listeners[event].filter(({ origin_id: r }) => r !== origin_id);
    }
}
export default WsEvent;