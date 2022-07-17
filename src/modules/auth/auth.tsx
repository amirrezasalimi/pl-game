import { h } from 'start-dom-jsx'
import userStore from '../../shared/services/user-store'
import { userState } from '../../shared/store/user'
import "./auth.scss"
import services from './services'
export const authInit = () => {
    let isLoading = false;
    const toggleLoading = (_isLoading: boolean) => {
        isLoading = _isLoading
        const el = document.querySelector(".loading") as any;
        if (el)
            el.style.display = isLoading ? "block" : "none"

    }
    let email: string = "";
    let password: string = "";
    const fillFields = () => {
        email = (document.querySelector("#email") as any).value;
        password = (document.querySelector("#password") as any).value;
    }
    const reloadPage = () => {
        window.location.href = "/"
    }

    const login = () => {
        if (isLoading) return;
        toggleLoading(true)
        fillFields();
        services.login(email, password).then((res) => {
            if (res.data.ok) {
                userStore.setToken(res.data.token)
                userStore.setUser(res.data.user)
                reloadPage();
            }
        }).catch(() => { }).finally(() => toggleLoading(false))
    }
    const register = () => {
        if (isLoading) return;
        toggleLoading(true)
        fillFields();
        services.register(email, password).then((res) => {
            if (res.data.ok) {
                userStore.setToken(res.data.token)
                userStore.setUser(res.data.user)
                reloadPage();
                
            }
        }).catch(() => { }).finally(() => toggleLoading(false))
    }

    const asGuest = () => {
        if (isLoading) return;
        toggleLoading(true)
        services.loginAsGuest().then((res) => {
            if (res.data.ok) {                
                userStore.setUser(res.data.user)
                userStore.setToken(res.data.token)
                toggleAuth(false)
                reloadPage();
            }

        }).finally(() => toggleLoading(false))
    }

    // add ui to page
    let ui = <div class="auth-modal" style={{ display: 'none' }}>
        <div class="auth-container">

            <div class="loading">
                Loading...
            </div>
            <div class="control">
                <input id="email" type="email" placeholder="email" />
            </div>
            <div class="control">
                <input id="password" type="password" placeholder="Password" />

            </div>
            <button onClick={login}>Login</button>
            <button onClick={register}>Register</button>
            <div>
                or
            </div>
            <button onClick={asGuest} class="guest">Guest</button>
        </div>

    </div>
    document.getElementById("app")?.appendChild(ui)


    const toggleAuth = (show: boolean) => {
        const el = document.querySelector(".auth-modal") as any;
        if (el)
            el.style.display = show ? "flex" : "none"
    }
    console.log("auth init");

    services.checkUser().then(user => {
        console.log(user);

        if (user) {
            userState.isLogin = true
            userState.user = user
        }
    }).catch(err => {
        toggleAuth(true)
    })
}
