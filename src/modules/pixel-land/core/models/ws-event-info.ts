export default interface IWsEventInfo {
    origin_id: string; // request id
    cb: (data: any) => void;
    middleware?:  (event: string,data:any) => boolean;
}