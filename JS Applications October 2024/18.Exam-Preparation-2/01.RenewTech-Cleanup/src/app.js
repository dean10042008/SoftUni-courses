import { page, render, html } from "../modules/modules.js";

import { renderCreate } from "./views/createView.js";
import { renderDetails } from "./views/detailsView.js";
import { renderEdit } from "./views/editView.js";
import { renderHome } from "./views/homeView.js";
import { renderLogin } from "./views/loginView.js";
import { logoutUser } from "./views/logoutView.js";
import { renderRegister } from "./views/registerView.js";
import { renderSolutions } from "./views/solutionsView.js";

const headerEl = document.querySelector("#site-header");

const renderNav = (ctx, next) => {
    render(createNav(), headerEl);

    next();
}

const createNav = () => {
    const hasAccessToken = localStorage.getItem("accessToken") !== null;

    const userNav = html`
        <div class="user">
            <a href="/create">Add Solution</a>
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
        <a id="logo" href="/"><img id="logo-img" src="/images/logo2.png" alt="logo" /></a>
        <nav>
            <div>
                <a href="/solutions">Solutions</a>
            </div>
                
                ${hasAccessToken ? userNav : guestNav}
        </nav>
    `;
}

// Middleware
page(renderNav);

// Routes
page("/", renderHome);
page("/register", renderRegister);
page("/login", renderLogin);
page("/logout", logoutUser);
page("/solutions", renderSolutions);
page("/solutions/:id", renderDetails);
page("/solutions/edit/:id", renderEdit);
page("/create", renderCreate);

// Starting page.js
page.start();