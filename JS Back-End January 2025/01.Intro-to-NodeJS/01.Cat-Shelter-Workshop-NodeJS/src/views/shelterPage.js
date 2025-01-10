import { getBreeds } from "../../modules/helpers.js";
import { page, html, render } from "../../modules/modules.js";

const mainEl = document.getElementById("root");

const template = (cat, breeds) => {
    return html`
        <form @submit=${(e) => finishSheltering(e, cat.id)} class="cat-form">
            <h2>Shelter the Cat</h2>
            <img src="${cat.imageUrl}" alt="${cat.name}">
            <label for="name">Name</label>
            <input name="name" type="text" id="name" value="${cat.name}" disabled>
            <label for="description">Description</label>
            <textarea name="description" id="description" disabled>${cat.description}</textarea>
            <label for="group">Breed</label>
            <select id="group" name="breed" disabled>
                ${
                    breeds.map(breed => {
                        return breed === cat.breed ? html`
                        <option value="${breed}" selected>${breed}</option>
                    ` : html`
                        <option value="${breed}">${breed}</option>
                    `})
                }
            </select>
            <button>Shelter Cat</button>
        </form>
    `;
}

export async function shelterPage(ctx) {
    const id = ctx.params.id;

    const catData = await getCatData(id);
    const breeds = await getBreeds();

    render(template(catData, breeds), mainEl);
}

const getCatData = async (catId) => {
    try {
        const res = await fetch(`http://localhost:5001/&&catId=${catId}`);
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
    }
}

const finishSheltering = async (e, id) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:5001/shelterCat", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            {
                id
            }),
        });

        const data = await response.json();
        
        if ( ! response.ok) {
            throw new Error(data.error);
        }

        page.redirect("/");
    }
    catch (error) {
        console.error(error);
        alert(error.message);
    }
}