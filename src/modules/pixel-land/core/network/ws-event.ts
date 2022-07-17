import { PL } from "../stage/pixel-land";

interface IEventInfo {
    origin_id: string; // request id
    cb: (data: any) => void;
}
class WsEvent {
    listeners: { [key: string]: IEventInfo[] } = {};
    on(origin_id: string, event: string, cb: (data: any) => void) {        
        console.log('on', origin_id, event);
        
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push({
            origin_id,
            cb: cb,
        });
    }
    emitLocal(event: string, data?: any) {
        if (!this.listeners[event]) {
            return;
        }
        this.listeners[event].forEach(({ cb }) => {
            cb(data);
        });
    }
    emit(event: string, data: any = {}) {
        PL.ws_handler.client?.send(JSON.stringify({
            name: event,
            data,
        }))
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