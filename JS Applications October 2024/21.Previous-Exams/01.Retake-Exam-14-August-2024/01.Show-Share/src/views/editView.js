import { endpoints } from "../../api/endpoints.js";
import { getShowDetails } from "../../modules/helpers.js";
import { html, page, render } from "../../modules/modules.js";

const rootEl = document.getElementById("root");

const template = (data) => {
    return html`
        <section id="edit">
            <div class="form">
                <h2>Edit Show</h2>
                <form @submit=${(e) => onSubmit(e, data._id)} class="edit-form">
                    <input type="text" name="title" id="title" placeholder="TV Show title" value=${data.title} />
                    <input type="text" name="image-url" id="image-url" placeholder="Image URL" value=${data.imageUrl} />
                    <input type="text" name="genre" id="genre" placeholder="Genre" value=${data.genre} />
                    <input type="text" name="country" id="country" placeholder="Country" value=${data.country} />
                    <textarea id="details" name="details" placeholder="Details" rows="2" cols="10">${data.details}</textarea>
                    <button type="submit">Edit Show</button>
                </form>
            </div>
        </section>
    `;
}

export const renderEdit = async (ctx) => {
    const showId = ctx.params.showId;
    const showData = await getShowDetails(showId);

    render(template(showData), rootEl);
}

const onSubmit = async (e, showId) => {
    e.preventDefault();

    const { title, "image-url": imageUrl, genre, country, details } = Object.fromEntries(
        new FormData(e.currentTarget)  
    );

    try {
        if (title === "" || imageUrl === "" || genre === "" || country === "" || details === "") {
            throw new Error("All fields are required");
        }

        const res = await fetch(endpoints.delete(showId), {
            method: 'PUT',
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

        if ( ! res.ok) throw new Error("Error editing");

        page.redirect(`/shows/${showId}`);
    }
    catch(e) {
        alert(e.message);
        console.error(e);
    }
}