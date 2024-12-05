import { page, html, render } from "../modules/modules.js";
import { renderAdd } from "./views/addView.js";
import { renderDetails } from "./views/detailsView.js";
import { renderEdit } from "./views/editView.js";

import { renderHome } from "./views/homeView.js";
import { renderLogin } from "./views/loginView.js";
import { logoutUser } from "./views/logoutView.js";
import { renderRegister } from "./views/registerView.js";
import { renderSearch } from "./views/searchView.js";
import { renderDashboard } from "./views/dashboardView.js";

const headerEl = document.getElementById("site-header");

const renderNav = (ctx, next) => {
    render(createNav(), headerEl);

    next();
}

const createNav = () => {
    const hasAccessToken = localStorage.getItem("accessToken") !== null;

    const guestNav = html`
        <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
    `;

    const userNav = html`
        <div class="user">
            <a href="/add">Add Your Car</a>
            <a href="/logout">Logout</a>
        </div>
    `;

    return html`
        <a id="logo" href="/"><img id="logo-car" src="/images/car-logo.png" alt="img" /></a>
        <nav>
            <div>
                <a href="/dashboard">Our Cars</a>
                <a href="/search">Search</a>
            </div>
            ${hasAccessToken ? userNav : guestNav}
        </nav>
    `;
}

// Middleware
page(renderNav);

// Views
page("/", renderHome);
page("/register", renderRegister);
page("/login", renderLogin);
page("/logout", logoutUser);
page("/dashboard", renderDashboard);
page("/dashboard/:itemId", renderDetails);
page("/dashboard/edit/:itemId", renderEdit);
page("/add", renderAdd);
page("/search", renderSearch);

// Start page.js
page.start();