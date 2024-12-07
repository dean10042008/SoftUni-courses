import { endpoints } from "../../api/endpoints.js";
import { html, page, render } from "../../modules/modules.js"

const rootEl = document.querySelector("#root");

const template = (data) => {
    return html`
       <section id="edit">
            <div class="form">
                <img class="border" src="/images/border.png" alt="border">
                <h2>Edit Character</h2>
                <form @submit=${(e) => handleEditSubmit(e, data._id)} class="edit-form">
                    <input type="text" name="category" id="category" placeholder="Character Type" value=${data.category} />
                    <input type="text" name="image-url" id="image-url" placeholder="Image URL" value=${data.imageUrl} />
                    <textarea id="description" name="description" placeholder="Description" rows="2" cols="10">${data.description}</textarea>
                    <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="2" cols="10">${data.moreInfo}</textarea>
                    <button type="submit">Edit</button>
                </form>
                <img class="border" src="/images/border.png" alt="border">
            </div>
        </section>
    `;
}

export const renderEdit = async (ctx) => {
    const id = ctx.params.id;
    const data = await getData(id);

    render(template(data), rootEl);
}

const getData = async (id) => {
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

    const { category, "image-url": imageUrl, description, "additional-info": moreInfo } = Object.fromEntries(
        new FormData(e.currentTarget)
    );

    try {
        if (category === "" || imageUrl === "" || description === "" || moreInfo === "") {
            throw new Error("All fields are required");
        }

        const response = await fetch(endpoints.editItemDetails(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("accessToken"),
            },
            body: JSON.stringify({ category, imageUrl, description, moreInfo }),
        });

        if (!response.ok) {
            throw new Error("Failed to edit solution");
        }

        page.redirect(`/dashboard/${id}`);
    }
    catch (error) {
        console.error(error);
        alert(error.message);
    }
}