class ClientMod {
    listeners = {};
    on(origin:string,event: string, callback: (...args: any[]) => any) {
        console.log("on", origin, event);
        
        // this.emit(event, callback);
    }
    emit(origin: string, event: string, ...args: any[]) {
        // this.emitUdp(event, ...args);
    }
}
export default ClientMod;