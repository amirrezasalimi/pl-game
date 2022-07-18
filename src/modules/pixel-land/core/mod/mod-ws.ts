import IWsEventInfo from "../models/ws-event-info";
import { PL } from "../stage/pixel-land";


class ModWs {
    mod_name: string;
    holded_events: { [key: string]: any[] } = {};
    hold_event: { [key: string]: boolean } = {};
    constructor(name: string) {
        this.mod_name = name;
    }
    on(event: string, cb: (data: any) => void) {
        return PL.ws.on(this.mod_name, event, cb, this.receiveEventMiddleware.bind(this));
    }
    receiveEventMiddleware(event: string, data: any) {
        const isHold = typeof this.hold_event[event] !== "undefined";
        if (isHold) {
            if (!this.holded_events[event]?.length) {
                this.holded_events[event] = []
            }
            this.holded_events[event].push(data);
        }
        return isHold;
    }
    emit(event: string, data: any = {}) {
        PL.ws.emit(event, data);
    }
    emitLocal(event: string, data?: any) {
        PL.ws.emitLocal(event, data);
    }
    removeListener(event: string) {
        return PL.ws.removeSingle(event, this.mod_name);
    }
    removeAllListeners() {
        return PL.ws.remove(this.mod_name);
    }

    hold(event: string) {
        this.hold_event[event] = true;
        this.holded_events[event] = [];
    }
    release(event: string) {
        if (this.hold_event[event] && this.holded_events?.[event]?.length > 0) {
            for (const data of this.holded_events[event]) {
                this.emitLocal(event, data);
            }
        }
        delete this.hold_event[event];
        delete this.holded_events[event];
    }
}
export default ModWs;