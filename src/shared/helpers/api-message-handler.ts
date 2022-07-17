import toast from "./toast";

export const canShowHandlerMessage = (response: any) => {
    const request_headers = response?.config?.headers ?? {};
    let _can_show = typeof request_headers?.toast != "undefined" ? request_headers?.toast : true;
    let _can_show_error = typeof request_headers?.error_toast != "undefined" ? request_headers?.error_toast : _can_show;
    let _can_show_success = typeof request_headers?.success_toast != "undefined" ? request_headers?.success_toast : _can_show;

    if (_can_show) {
        if (response?.status == 200 && _can_show_success) {
            return true;
        }
        if (response?.status != 200 && _can_show_error) {
            return true;
        }
    }
    return false;
}
export const messageHandler = (res: any) => {    
    if (typeof res.ok === "boolean" && res.message && res.message !== "") {
        if (res.ok) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    }
}