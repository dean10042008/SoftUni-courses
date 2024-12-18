import { page } from "../../modules/modules.js";

import { welcomeView } from "./views/welcome.js";
import { navigation } from "./views/navigation.js";
import { registerView } from "./views/register.js";
import { loginView } from "./views/login.js";
import { dashboardView } from "./views/dashboard.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { profileView } from "./views/profile.js";
import { competeView } from "./views/compete.js";
import { editView } from "./views/edit.js";
import { resultView } from "./views/result.js";

page(navigation);

page('/', welcomeView);
page('/register', registerView);
page('/login', loginView);
page('/create', createView);
page('/browse', dashboardView);
page('/browse/:id', detailsView);
page('/browse/edit/:id', editView);
page('/browse/compete/:id', competeView);
page('/browse/result/:id', resultView);
page('/profile/:username', profileView);

page();