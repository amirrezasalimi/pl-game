interface IEventInfo {
    rid: string; // request id
    cb: (data: any) => void;
}
class WsEvent {
    listeners: { [key: string]: IEventInfo[] } = {};
    on(rid: string, event: string, cb: (data: any) => void) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push({
            rid,
            cb: cb,
        });
    }
    emit(event: string, data?: any) {
        if (!this.listeners[event]) {
            return;
        }
        this.listeners[event].forEach(({ cb }) => {
            cb(data);
        });
    }
    remove(rid: string) {
        for (const event in this.listeners) {
            this.listeners[event] = this.listeners[event].filter(({ rid: r }) => r !== rid);
        }
    }
}
export default WsEvent;