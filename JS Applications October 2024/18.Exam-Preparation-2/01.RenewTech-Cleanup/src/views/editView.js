import { endpoints } from "../../api/endpoints.js";
import { html, page, render } from "../../modules/modules.js"

const rootEl = document.querySelector("#root");

const template = (data) => {
    return html`
       <section id="edit">
            <div class="form">
                <img class="border" src="/images/border.png" alt="" />
                <h2>Edit Solution</h2>
                <form @submit=${(e) => handleEditSubmit(e, data._id)} class="edit-form">
                    <input type="text" name="type" id="type" placeholder="Solution Type" value=${data.type} />
                    <input type="text" name="image-url" id="image-url" placeholder="Image URL" value=${data.imageUrl} />
                    <textarea id="description" name="description" placeholder="Description" rows="2" cols="10">${data.description}</textarea>
                    <textarea id="more-info" name="more-info" placeholder="more Info" rows="2" cols="10">${data.learnMore}</textarea>
                    <button type="submit">Edit</button>
                </form>
            </div>
        </section>
    `;
}

export const renderEdit = async (ctx) => {
    const id = ctx.params.id;
    const data = await getSolution(id);

    render(template(data), rootEl);
}

const getSolution = async (id) => {
    try {
        const response = await fetch(endpoints.getItemDetails(id));

        if (!response.ok) {
            throw new Error(`Failed to fetch solution: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error fetching solution:", error);
        alert(error.message);
    }
}

const handleEditSubmit = async (e, id) => {
    e.preventDefault();

    const { type, "image-url": imageUrl, description, "more-info": learnMore } = Object.fromEntries(
        new FormData(e.currentTarget)
    );

    try {
        if (type === "" || imageUrl === "" || description === "" || learnMore === "") {
            throw new Error("All fields are required");
        }

        const response = await fetch(endpoints.editItemDetails(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("accessToken"),
            },
            body: JSON.stringify({ type, imageUrl, description, learnMore }),
        });

        if (!response.ok) {
            throw new Error("Failed to edit solution");
        }

        page.redirect(`/solutions/${id}`);
    }
    catch (error) {
        console.error(error);
        alert(error.message);
    }
}