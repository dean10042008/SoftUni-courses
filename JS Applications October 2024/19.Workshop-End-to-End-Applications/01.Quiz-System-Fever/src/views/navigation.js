import { onProfileClick } from "../../modules/helpers.js";
import { html, render } from "../../modules/modules.js";
import { logout } from "./logout.js";

const header = document.querySelector('body > #container > #titlebar');

const template = (isLogged, logoutHandler) => html`
    <nav>
        <a class="logotype" href="/"><i class="fas fa-question-circle"></i><i class="merge fas fa-check-circle"></i><span>Quiz Fever</span></a>
        <div class="navigation">
            <a class="nav-link" href="/browse">Browse</a>
            ${isLogged ? html`
                <div id="user-nav">
                    <a class="nav-link" href="/create">Create</a>
                    <a @click=${onProfileClick} class="nav-link profile-link" href="#"><i class="fas fa-user-circle"></i></a>
                    <a @click=${logoutHandler} id="logoutBtn" class="nav-link" href="javascript:void(0)">Logout</a>
                </div>
                ` : html`
                <div id="guest-nav">
                    <a class="nav-link" href="/login">Sign in</a>
                </div>
            `}
        </div>
    </nav>
`;

export async function navigation(ctx, next) {
    const userData = await authorize();
    
    render(template(userData, logout), header);
    next();
}

async function authorize() {
    try {
        const headerAuthorization = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem('userData')).accessToken : undefined;

        const res = await fetch('http://localhost:5001/users/verify', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'x-authorization': headerAuthorization
            }
        });

        const data = await res.json();

        if (data.message !== 'Verification successful.') {
            localStorage.clear();
            return false;
        }
        return true;
    }
    catch (err) {
        console.error(err);
        localStorage.clear();
    }
}