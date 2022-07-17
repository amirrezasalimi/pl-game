export default function makeUrl(url: string, params: any) {
    let url_ = url;
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const val = params[key];
            url_ = url_.replace(`{${key}}`, val);
        }
    }
    return url_;
}