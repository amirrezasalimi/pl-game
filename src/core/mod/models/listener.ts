export default interface ModListener {
    uid: string;
    callback: (...args: any[]) => any;
}