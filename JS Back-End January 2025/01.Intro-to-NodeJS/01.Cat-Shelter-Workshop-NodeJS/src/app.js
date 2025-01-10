import { render, page, html } from "../modules/modules.js";

import { homePage } from "./views/homePage.js";
import { addBreedPage } from "./views/addBreedPage.js";
import { addCatPage } from "./views/addCatPage.js";
import { editPage } from "./views/editPage.js";
import { shelterPage } from "./views/shelterPage.js";

const header = document.querySelector("#site-header");

const renderNav = (ctx, next) => {
    const isHome = ctx.path === "/";
    render(createNav(isHome), header);

    next();
}

const createNav = (isHome) => {
    const searchCat = async (e) => {
        e.preventDefault();

        let search = document.querySelector("input").value;
        
        if (search === "") {
            search = "show_everything";
        }
        
        try {
            const response = await fetch(`http://localhost:5001/&&search=${search}`);
            const data = await response.json();
            localStorage.setItem("searchedCats", JSON.stringify(data));
            page();
        }
        catch (error) {
            console.error(error);
        }
    }

    return html`
        <nav>
            <ul class="navigation">
                <li><a href="/">Home Page</a></li>
                <li><a href="/addBreed">Add Breed</a></li>
                <li><a href="/addCat">Add Cat</a></li>
            </ul>
        </nav>
        <h1>Cat Shelter</h1>
        ${
            isHome ? 
            html`<form @submit=${searchCat}>
                    <input type="text">
                    <button type="submit">Search</button>
                </form>`
                : ""
        }
    `;
}

// Middleware
page(renderNav);

// Routing
page("/", homePage);
page("/addBreed", addBreedPage);
page("/addCat", addCatPage);
page("/edit/:id", editPage);
page("/shelter/:id", shelterPage);

// Start page.js
page.start();