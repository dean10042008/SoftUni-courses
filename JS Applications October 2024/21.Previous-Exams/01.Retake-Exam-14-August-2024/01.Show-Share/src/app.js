import { page, html, render } from "../modules/modules.js";
import { renderAdd } from "./views/addView.js";
import { renderDetails } from "./views/detailsView.js";
import { renderEdit } from "./views/editView.js";

import { renderHome } from "./views/homeView.js";
import { renderLogin } from "./views/loginView.js";
import { logoutUser } from "./views/logoutView.js";
import { renderRegister } from "./views/registerView.js";
import { renderSearch } from "./views/searchView.js";
import { renderShows } from "./views/showsView.js";

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
            <a href="/add">Add Show</a>
            <a href="/logout">Logout</a>
        </div>
    `;

    return html`
        <a id="logo" href="/">
            <img id="logo-img" src="/images/show_logo.png" alt="logo" />
        </a>
        <nav>
          <div>
            <a href="/shows">TV Shows</a>
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
page("/shows", renderShows);
page("/add", renderAdd);
page("/shows/:showId", renderDetails);
page("/shows/edit/:showId", renderEdit);
page("/search", renderSearch);

// Start page.js
page.start();