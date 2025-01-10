import { getBreeds } from "../../modules/helpers.js";
import { page, html, render } from "../../modules/modules.js";

const mainEl = document.getElementById("root");

const template = (cat, breeds) => {
    return html`
        <form @submit=${(e) => finishEdit(e, cat.id)} class="cat-form" enctype="multipart/form-data">
            <h2>Edit Cat</h2>
            <label for="name">Name</label>
            <input name="name" type="text" id="name" value="${cat.name}">
            <label for="description">Description</label>
            <textarea name="description" id="description">${cat.description}</textarea>
            <label for="image">Image</label>
            <input name="upload" type="text" id="image" value=${cat.imageUrl}>
            <label for="group">Breed</label>
            <select id="group" name="breed">
                ${
                    breeds.map(breed => {
                        return breed === cat.breed ? html`
                        <option value="${breed}" selected>${breed}</option>
                    ` : html`
                        <option value="${breed}">${breed}</option>
                    `})
                }
            </select>
            <button>Edit Cat</button>
        </form>
    `;
}

export async function editPage(ctx) {
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

const finishEdit = async (e, id) => {
    e.preventDefault();

    const { name, description, upload: imageUrl, breed } = Object.fromEntries(
        new FormData(e.target)
    );

    try {
        const response = await fetch("http://localhost:5001/editCat", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
            { 
                name,
                description, 
                imageUrl, 
                breed, 
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