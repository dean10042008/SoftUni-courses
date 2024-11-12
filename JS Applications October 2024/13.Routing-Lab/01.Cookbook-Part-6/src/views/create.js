import page from "//unpkg.com/page/page.mjs";
import { html, render } from 'https://unpkg.com/lit-html';

const baseUrl = 'http://localhost:3030/data/recipes';

const mainSection = document.querySelector('body main');

const template = () => html`
    <section>
        <h2>New Recipe</h2>
        <form @submit=${createFormSubmit}>
            <label>Name: <input type="text" name="name" placeholder="Recipe name"></label>
            <label>Image: <input type="text" name="img" placeholder="Image URL"></label>
            <label class="ml">Ingredients: <textarea name="ingredients"
                    placeholder="Enter ingredients on separate lines"></textarea></label>
            <label class="ml">Preparation: <textarea name="steps"
                    placeholder="Enter preparation steps on separate lines"></textarea></label>
            <input type="submit" value="Create Recipe">
        </form>
    </section>
`;

export default function createPage() {
    render(template(), mainSection);
}

function createFormSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    data.ingredients = data.ingredients.split('\n');
    data.steps = data.steps.split('\n');
    const accessToken = localStorage.getItem('accessToken');

    fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': accessToken
        }
    })
        .then(res => res.json())
        .then(data => {
            page.redirect("/catalog");
        })
};
