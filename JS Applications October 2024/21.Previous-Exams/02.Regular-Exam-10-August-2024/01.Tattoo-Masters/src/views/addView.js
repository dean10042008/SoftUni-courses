import { endpoints } from "/api/endpoints.js";
import { page, html, render } from "/modules/modules.js";

const rootEl = document.getElementById("root");

const template = () => {
    return html`
        <section id="create">
            <div class="form">
                <h2>Add tattoo</h2>
                <form @submit=${onSubmit} class="create-form">
                    <input type="text" name="type" id="type" placeholder="Tattoo Type" />
                    <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
                    <textarea id="description" name="description" placeholder="Description" rows="2"
                        cols="10"></textarea>
                    <select id="user-type" name="user-type">
                        <option value="" disabled selected>Select your role</option>
                        <option value="Tattoo Artist">Tattoo Artist</option>
                        <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
                        <option value="First Time in Tattoo">
                            First Time in Tattoo
                        </option>
                        <option value="Tattoo Collector">Tattoo Collector</option>
                    </select>
                    <button type="submit">Add tattoo</button>
                </form>
            </div>
        </section>
    `;
}

export const addPage = async () => {
    render(template(), rootEl);
}

const onSubmit = async (e) => {
    e.preventDefault();

    const { type, "image-url": imageUrl, description, "user-type": userType } = Object.fromEntries(
        new FormData(e.currentTarget)
    );
    try {
        if (type === "" || imageUrl === "" || description === "" || userType === "") {
            throw new Error("All fields are required.");
        }

        const response = await fetch(endpoints.create, {
            method: 'POST',
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

        if ( ! response.ok) throw new Error("Failed to create.");

        page.redirect("/collection");
    }
    catch(err) {
        alert(err.message);
        console.error(err);
    }
}