import { getTattooData } from "/modules/helpers.js";
import { endpoints } from "/api/endpoints.js";
import { page, html, render } from "/modules/modules.js";

const rootEl = document.getElementById("root");

const template = (data) => {
    return html`
        <section id="edit">
            <div class="form">
                <h2>Edit tattoo</h2>
                <form @submit=${(e) => onSubmit(e, data._id)} class="edit-form">
                    <input type="text" name="type" id="type" placeholder="Tattoo Type" value=${data.type} />
                    <input type="text" name="image-url" id="image-url" placeholder="Image URL" value=${data.imageUrl} />
                    <textarea id="description" name="description" placeholder="Description" rows="2"
                        cols="10">${data.description}</textarea>
                    <select id="user-type" name="user-type" .value=${data.userType}>
                        <option value="" disabled selected>Select your role</option>
                        <option value="Tattoo Artist">Tattoo Artist</option>
                        <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
                        <option value="First Time in Tattoo">
                            First Time in Tattoo
                        </option>
                        <option value="Tattoo Collector">Tattoo Collector</option>
                    </select>
                    <button type="submit">Edit</button>
                </form>
            </div>
        </section>
    `;
}

export const editPage = async (ctx) => {
    const data = await getTattooData(ctx.params.tattooId);

    render(template(data), rootEl);
}

const onSubmit = async (e, id) => {
    e.preventDefault();

    const { type, "image-url": imageUrl, description, "user-type": userType } = Object.fromEntries(
        new FormData(e.currentTarget)
    );
    try {
        if (type === "" || imageUrl === "" || description === "" || userType === "") {
            throw new Error("All fields are required.");
        }

        const response = await fetch(endpoints.edit(id), {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                "X-Authorization": localStorage.getItem("accessToken"),
            },
            body: JSON.stringify({
                type,
                imageUrl,
                description,
                userType
            })
        });

        if ( ! response.ok) throw new Error("Failed to edit.");

        page.redirect(`/collection/${id}`);
    }
    catch(err) {
        alert(err.message);
        console.error(err);
    }
}