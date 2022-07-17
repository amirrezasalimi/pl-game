import axios from "axios";
import { API_URL } from "../../constants/config";
import { canShowHandlerMessage, messageHandler } from "../helpers/api-message-handler";
import IResponse from "../models/response";

const pixelApi = axios.create({
    baseURL: API_URL,
})
// add token to every request
pixelApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            // @ts-ignore
            config.headers["token"] = token;
        }
        return config;
    }
    , function (error) {
        return Promise.reject(error);
    });
pixelApi.interceptors.response.use(function (response) {
    // message handler
    if (canShowHandlerMessage(response)) { messageHandler(response.data as unknown as IResponse); }
    return response;
}, function (error) {
    const response = error.response;
    // message handler
    if (canShowHandlerMessage(response)) { messageHandler(response.data as unknown as IResponse); }
    return Promise.reject(error);
});
export default pixelApi;