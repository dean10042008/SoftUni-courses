import { html, render } from 'https://unpkg.com/lit-html';

import recipes from "../api/recipes.js";

const mainSection = document.querySelector('body main');

const template = (recipes = []) => html`
    <section>
        <div class="hero">
            <h2>Welcome to My Cookbook</h2>
        </div>
        <header class="section-title">Recently added recipes</header>
        <div class="recent-recipes">
            ${recipes.map(recipe => html`
                <article class="recent">
                    <div class="recent-preview">
                        <img src="${recipe.img}" alt="${recipe.name}" />
                    </div>
                    <div class="recent-title">${recipe.name}</div>
                </article>
            `)}
        </div>
        <footer class="section-title">
            <p>Browse all recipes in the <a href="/catalog">Catalog</a></p>
        </footer>
    </section>
`;

export default function homePage() {
    render(template([]), mainSection);

    recipes.getRecent()
        .then(recipes => {
            render(template(recipes), mainSection)
        });
}