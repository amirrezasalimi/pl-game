class ServerMod {
    constructor() {

    }
    on(_origin: string, event: string, callback: (...args: any[]) => any) {
        console.log("on",_origin, event);

    }
    emit(_origin: string, event: string, ...args: any[]) {
        // this.emitUdp(event, ...args);
    }
}
export default ServerMod;