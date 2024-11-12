import page from "//unpkg.com/page/page.mjs";

import createPage from "./views/create.js";
import catalogPage from "./views/catalog.js";
import loginPage from "./views/login.js";
import logoutPage from "./views/logout.js";
import registerPage from "./views/register.js";
import { renderNavigation } from "./views/navigation.js";
import homePage from "./views/home.js";

page("/", homePage);
page("/catalog", catalogPage);
page("/login", loginPage);
page("/register", registerPage);
page("/create", createPage);
page("/logout", logoutPage);
page();

renderNavigation();