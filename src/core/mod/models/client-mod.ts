export default interface ClientMod {
    on: (event: string, callback: (...args: any[]) => any) => void;
    emit: (event: string, ...args: any[]) => void;
}