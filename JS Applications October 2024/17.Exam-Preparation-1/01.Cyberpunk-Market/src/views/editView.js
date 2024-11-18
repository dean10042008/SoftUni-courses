import { endpoints } from "../../api/endpoints.js";
import { page, html, render } from "../../modules/modules.js";

const rootEl = document.querySelector("#main-element");

const template = (data) => {
    return html`
        <section id="edit">
            <div class="form form-item">
                <h2>Edit Your Item</h2>
                <form @submit=${(e) => editItem(e, data._id)} class="edit-form">
                    <input type="text" name="item" id="item" placeholder="Item" value=${data.item} />
                    <input type="text" name="imageUrl" id="item-image" placeholder="Your item Image URL" value=${data.imageUrl} />
                    <input type="text" name="price" id="price" placeholder="Price in Euro" value=${data.price} />
                    <input type="text" name="availability" id="availability" placeholder="Availability Information" value=${data.availability} />
                    <input type="text" name="type" id="type" placeholder="Item Type" value=${data.type} />
                    <textarea id="description" name="description" placeholder="More About The Item" rows="10" cols="50">${data.description}</textarea>
                    <button type="submit">Edit</button>
                </form>
            </div>
        </section>
    `;
}

export const renderEdit = async (ctx) => {
    const itemId = ctx.params.itemId;
    const data = await  getTeamData(itemId);

    render(template(data), rootEl);
}

const getTeamData = async (id) => {
    try {
        const res = await fetch(endpoints.getItemDetails(id));
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
    }
}

const editItem = async (e, itemId) => {
    e.preventDefault();

    const { item, imageUrl, price, availability, type, description } = Object.fromEntries(
        new FormData(e.currentTarget)  
    );

    try {
        if (item === "" || imageUrl === "" || price === "" || availability === "" || type === "" || description === "") {
            throw new Error("All fields are required!");
        }

        const res = await fetch(endpoints.editItemDetails(itemId), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("accessToken"),
            },
            body: JSON.stringify({ item, imageUrl, price, availability, type, description }),
        });

        if (!res.ok) {
            throw new Error(res.status);
        }
        
        page.redirect(`/market/${itemId}`);
    }
    catch (err) {
        console.error(err);
        alert(err.message);
    }
}