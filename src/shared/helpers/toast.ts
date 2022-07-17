import Toastify from 'toastify-js'
type toastTypes = 'success' | 'error' | 'default';
class toast {
    typesClassMap: { [key in toastTypes]: string } = {
        success: 'toast-success',
        error: 'toast-error',
        default: 'toast-default',
    }
    show(message: string, type: toastTypes = "success", options: Toastify.Options) {
        Toastify({
            text: message,
            className: this.typesClassMap[type],
            ...options
        }).showToast();
    }
    error(message: string, options: Toastify.Options={}) {
        this.show(message, "error", options);
    }
    success(message: string, options: Toastify.Options={}) {
        this.show(message, "success", options);
    }
}
export default new toast();