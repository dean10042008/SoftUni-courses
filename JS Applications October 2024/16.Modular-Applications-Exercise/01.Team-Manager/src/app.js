import { page, render, html } from "../modules/modules.js";
import { renderCreate } from "./views/createView.js";
import { renderDetails } from "./views/detailsView.js";
import { renderEdit } from "./views/editView.js";

import { renderHome } from "./views/homeView.js";
import { renderLogin } from "./views/loginView.js";
import { logoutUser } from "./views/logoutView.js";
import { renderMyTeams } from "./views/myTeamsView.js";
import { renderRegister } from "./views/registerView.js";
import { renderTeams } from "./views/teamsView.js";


const headerEl = document.getElementById("titlebar");

const renderNav = (ctx, next) => {
    render(createNav(), headerEl);

    next();
}

const createNav = () => {
    const hasAccessToken = localStorage.getItem("accessToken") !== null;
    
    const guestNav = html`
        <a href="/login" class="action">Login</a>
        <a href="/register" class="action">Register</a>
    `;

    const userNav = html`
        <a href="/myTeams" class="action">My Teams</a>
        <a href="/logout" class="action">Logout</a>
    `;


    return html`
        <a href="/" class="site-logo">Team Manager</a>
        <nav>
            <a href="/teams" class="action">Browse Teams</a>
            ${
                hasAccessToken ? userNav : guestNav
            }
        </nav>
    `;
}

page(renderNav);
page("/", renderHome);
page("/register", renderRegister);
page("/login", renderLogin);
page("/logout", logoutUser);
page("/teams", renderTeams);
page("/teams/:teamId", renderDetails);
page("/teams/edit/:teamId", renderEdit);
page("/create", renderCreate);
page("/myTeams", renderMyTeams);

page.start();