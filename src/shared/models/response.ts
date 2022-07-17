export default interface IResponse {
    ok: boolean;
    message: string;
    [key: string]: any;
}