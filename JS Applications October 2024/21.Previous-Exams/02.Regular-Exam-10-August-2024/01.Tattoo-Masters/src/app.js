import { page, html, render } from "/modules/modules.js";

import { homePage } from "./views/homeView.js";
import { loginPage } from "./views/loginView.js";
import { logoutUser } from "./views/logoutView.js";
import { registerPage } from "./views/registerView.js";
import { dashboardPage } from "./views/dashboardView.js";
import { addPage } from "./views/addView.js";
import { detailsPage } from "./views/detailsView.js";
import { editPage } from "./views/editView.js";

const siteHeader = document.getElementById("site-header");

const renderNav = (ctx, next) => {
    render(createNav(), siteHeader);

    next();
}

const createNav = () => {
    const isLoggedIn = localStorage.getItem("accessToken") !== null;

    const userNav = html`
        <div class="user">
            <a href="/add">Add Tattoo</a>
            <a id="logout" href="/logout">Logout</a>
        </div>
    `;

    const guestNav = html`
        <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
    `;

    return html`
        <a id="logo" href="/"><img id="logo-img" src="/images/logo.png" alt="logo"/></a>
        <nav>
            <a href="/collection">Collection</a>

            ${isLoggedIn ? userNav : guestNav}
        </nav>
    `;
}

// Middleware
page(renderNav);

// Routes
page("/", homePage);
page("/register", registerPage);
page("/login", loginPage);
page("/logout", logoutUser);
page("/collection", dashboardPage);
page("/collection/:tattooId", detailsPage);
page("/collection/edit/:tattooId", editPage);
page("/add", addPage);

// Start page.js
page.start();