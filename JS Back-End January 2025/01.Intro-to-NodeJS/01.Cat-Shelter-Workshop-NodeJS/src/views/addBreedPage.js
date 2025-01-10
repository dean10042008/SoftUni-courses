import { page, html, render } from "../../modules/modules.js";

const mainEl = document.getElementById("root");

const template = () => {
    return html`
        <form @submit=${addBreed} class="cat-form">
            <h2>Add Cat Breed</h2>
            <label for="breed-name">Breed Name</label>
            <input name="breed" type="text" id="breed-name">
            <button type="submit">Add Breed</button>
        </form>
    `;
}

export function addBreedPage() {
    render(template(), mainEl);
}

async function addBreed(e) {
    e.preventDefault();

    const { breed } = Object.fromEntries(
        new FormData(e.target)
    );

    try {
        const response = await fetch("http://localhost:5001/addBreed", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ breed }),
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