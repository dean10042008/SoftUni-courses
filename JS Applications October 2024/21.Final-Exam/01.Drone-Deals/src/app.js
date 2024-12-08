import { page, html, render } from "../modules/modules.js";
import { renderCreate } from "./views/createView.js";
import { renderDetails } from "./views/detailsView.js";
import { renderEdit } from "./views/editView.js";

import { renderHome } from "./views/homeView.js";
import { renderLogin } from "./views/loginView.js";
import { renderLogout } from "./views/logoutView.js";
import { renderMarket } from "./views/marketView.js";
import { renderRegister } from "./views/registerView.js";

const headerEl = document.querySelector("#site-header");

const renderNavigation = (ctx, next) => {
    render(template(), headerEl);

    next();
}

const template = () => {
    const hasAccessToken = localStorage.getItem('accessToken');

    const userNav = html`
        <div class="user">
            <a href="/create">Sell</a>
            <a href="/logout">Logout</a>
        </div>
    `;

    const guestNav = html`
        <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
    `;

    return html`
        <a id="logo" href="/"><img id="logo" src="/images/logo2.png" alt="img" /></a>
        <nav>
            <div>
                <a href="/dashboard">Marketplace</a>
            </div>

            ${hasAccessToken ? userNav : guestNav}
        </nav>
    `;
}

page(renderNavigation);
page("/", renderHome);
page("/register", renderRegister);
page("/login", renderLogin);
page("/logout", renderLogout);
page("/dashboard", renderMarket);
page("/dashboard/:itemId", renderDetails);
page("/dashboard/edit/:itemId", renderEdit);
page("/create", renderCreate);

page.start();