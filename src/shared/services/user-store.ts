import { userState } from "../store/user";

class UserStoreService {
    token_key = "token";
    setUser = (user: any) => {
        userState.user = user;
    }
    getUser = () => userState.user;
    setToken = (token: string) => {
        localStorage.setItem(this.token_key, token);
    }
    getToken = () => {
        return localStorage.getItem(this.token_key);
    }
}
export default new UserStoreService();