export default interface ServerMod {
    on: (event: string, callback: (...args: any[]) => any) => void;
    emit: (event: string, ...args: any[]) => void;
    emitUdp: (event: string, ...args: any[]) => void;
}