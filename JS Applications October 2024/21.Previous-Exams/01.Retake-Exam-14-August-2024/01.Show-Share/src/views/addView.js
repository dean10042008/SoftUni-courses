import { endpoints } from "../../api/endpoints.js";
import { html, page, render } from "../../modules/modules.js";

const rootEl = document.getElementById("root");

const template = () => {
    return html`
        <section id="create">
            <div class="form">
                <h2>Add Show</h2>
                <form @submit=${onSubmit} class="create-form">
                    <input type="text" name="title" id="title" placeholder="TV Show title" />
                    <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
                    <input type="text" name="genre" id="genre" placeholder="Genre" />
                    <input type="text" name="country" id="country" placeholder="Country" />
                    <textarea id="details" name="details" placeholder="Details" rows="2" cols="10"></textarea>
                    <button type="submit">Add Show</button>
                </form>
            </div>
        </section>
    `;
}

export const renderAdd = () => {
    render(template(), rootEl);
}

const onSubmit = async (e) => {
    e.preventDefault();

    const { title, "image-url": imageUrl, genre, country, details } = Object.fromEntries(
        new FormData(e.currentTarget)  
    );

    try {
        if (title === "" || imageUrl === "" || genre === "" || country === "" || details === "") {
            throw new Error("All fields are required");
        }

        const res = await fetch(endpoints.create, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                title,
                imageUrl,
                genre,
                country,
                details
            })
        });

        if ( ! res.ok) throw new Error("Error creating");

        page.redirect("/shows");
    }
    catch(e) {
        alert(e.message);
        console.error(e);
    }
}