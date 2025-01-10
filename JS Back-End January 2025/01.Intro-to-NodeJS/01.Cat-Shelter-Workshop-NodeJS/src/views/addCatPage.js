import { getBreeds } from "../../modules/helpers.js";
import { page, html, render } from "../../modules/modules.js";

const mainEl = document.getElementById("root");

const template = (breeds) => {
    return html`
        <form @submit=${addCat} class="cat-form" enctype="multipart/form-data">
            <h2>Add Cat</h2>
            <label for="name">Name</label>
            <input name="name" type="text" id="name">
            <label for="description">Description</label>
            <textarea name="description" id="description"></textarea>
            <label for="image">Image</label>
            <input name="upload" type="text" id="image">
            <label for="group">Breed</label>
            <select name="breed" id="group">
                ${
                    breeds.map(breed => html`
                        <option value="${breed}">${breed}</option>
                    `)
                }
            </select>
            <button type="submit">Add Cat</button>
        </form>
    `;
}

export async function addCatPage() {
    const breeds = await getBreeds();

    render(template(breeds), mainEl);
}

async function addCat(e) {
    e.preventDefault();

    const { name, description, upload: imageUrl, breed } = Object.fromEntries(
        new FormData(e.target)
    );

    try {
        const response = await fetch("http://localhost:5001/addCat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, description, imageUrl, breed }),
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