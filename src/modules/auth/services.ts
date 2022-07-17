import { API } from "../../constants/api";
import pixelApi from "../../shared/http/pixelApi";
import { userState } from "../../shared/store/user";

class AuthServices {
    login = (email: string, password: string) => pixelApi.post(API.LOGIN, { email, password });
    register = (email: string, password: string) => pixelApi.post(API.REGISTER, { email, password });
    checkUser = () => pixelApi.get(API.GET_USER);
    loginAsGuest = () => pixelApi.post(API.LOGIN_AS_GUEST);
}
export default new AuthServices();