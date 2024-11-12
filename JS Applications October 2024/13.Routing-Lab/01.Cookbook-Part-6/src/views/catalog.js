import page from "//unpkg.com/page/page.mjs";
import { html, render } from 'https://unpkg.com/lit-html';

import recipes from "../api/recipes.js";

const mainSection = document.querySelector('body main');
const baseUrl = 'http://localhost:3030/data/recipes';

let filter = {};

const template = (recipes = [], onSearch) => html`
    <section id="catalog-section">
        <form @submit=${onSearch} style="display: flex; justify-content: center;">
            <div>
                <input type="text" name="search" style="position: unset;" />
                <input type="submit" value="Search" style="display: inline;" />
            </div>
        </form>

        ${recipes.map(recipe => html`
            <article @click=${() => recipeClickHandler(recipe._id)} class="preview">
                <div class="title">
                    <h2>${recipe.name}</h2>
                </div>
                <div class="small">
                    <img src=${recipe.img} alt=${recipe.name} />
                </div>
            </article>
        `)}
    </section>
`;

const detailedArticleTemplate = ({ article, isOwner }) => html`
    <article>
        <h2>${article.name}</h2>
        <div class="band">
            <div class="thumb">
                <img src="${article.img}">
            </div>
            <div class="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    ${article.ingredients.map(i => html`<li>${i}</li>`)}
                </ul>
            </div>
        </div>
        <div class="description">
            <h3>Preparation:</h3>
            ${article.steps.map(step => html`<p>${step}</p>`)}
        </div>
        ${isOwner
        ? html`
                <div>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            `
        : ''
    }
    </article>
`;

export default function catalogPage() {
    render(template(), mainSection);

    recipes.getAll(filter)
        .then(recipes => {
            render(template(recipes, onSearch), mainSection);
        })
        .catch(err => alert(err.message));
}

async function recipeClickHandler(recipeId) {
    const response = await fetch(`${baseUrl}/${recipeId}`);
    const articleDetails = await response.json();

    const userId = localStorage.getItem('_id');
    const isOwner = articleDetails._ownerId === userId;

    render(detailedArticleTemplate({
        article: articleDetails,
        isOwner,
    }), mainSection);
}

function onSearch(e) {
    e.preventDefault();

    const { search } = Object.fromEntries(new FormData(e.currentTarget));
    console.log(search);

    filter = {
        search: search.trim(),
    };
    
    page.redirect("/catalog?search=" + search);
}