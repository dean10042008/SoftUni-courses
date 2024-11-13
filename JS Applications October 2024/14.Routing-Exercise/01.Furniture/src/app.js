import { page, render, html } from "../modules/modules.js";
import { renderCreate } from "./views/createView.js";

import { renderDashboard } from "./views/dashboardView.js";
import { renderDetails } from "./views/detailsView.js";
import { renderEdit } from "./views/editView.js";
import { renderLogin } from "./views/loginView.js";
import { logoutUser } from "./views/logoutView.js";
import { renderMyPublications } from "./views/myPublicationsView.js";
import { renderRegistration } from "./views/registerView.js";


const [siteHeaderEl, root] = document.querySelectorAll(".site-header, #root");

function renderNav(ctx, next) {
    render(createNav(), siteHeaderEl)

    next();
}

function createNav() {
    const isLoggedIn = localStorage.getItem("accessToken");

    const userNav = html`
        <div id="user">
            <a id="createLink" href="/create" >Create Furniture</a>
            <a id="profileLink" href="/myPublications">My Publications</a>
            <a id="logoutBtn" href="/logout">Logout</a>
        </div>
    `;

    const guestNav = html`
        <div id="guest">
            <a id="loginLink" href="/login">Login</a>
            <a id="registerLink" href="/register">Register</a>
        </div>
    `;
    
    return html`
        <h1><a href="/">Furniture Store</a></h1>
        <nav>
            <a id="catalogLink" href="/" class="active">Dashboard</a>
            ${
                isLoggedIn? userNav : guestNav
            }
        </nav>
    `;
}

page(renderNav);
page("/", renderDashboard);
page("/catalog/:id", renderDetails);
page("/catalog/edit/:id", renderEdit);
page("/register", renderRegistration);
page("/login", renderLogin);
page("/logout", logoutUser);
page("/create", renderCreate);
page("/myPublications", renderMyPublications);
page.start();