import { endpoints } from "../../api/endpoints.js";
import { displayErrorMessage } from "../../modules/helpers.js";
import { page, html, render } from "../../modules/modules.js";

const rootEl = document.querySelector("#main-element");

const template = (data) => {
    return html`
        <section id="edit">
            <div class="form form-item">
                <h2>Edit Offer</h2>
                <form @submit=${(e) => editItem(e, data._id)} class="edit-form">
                    <input type="text" name="model" id="model" placeholder="Drone Model" value=${data.model} />
                    <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" value=${data.imageUrl} />
                    <input type="number" name="price" id="price" placeholder="Price" value=${data.price} />
                    <input type="number" name="weight" id="weight" placeholder="Weight" value=${data.weight} />
                    <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" value=${data.phone} />
                    <input type="text" name="condition" id="condition" placeholder="Condition" value=${data.condition} />
                    <textarea name="description" id="description" placeholder="Description">${data.description}</textarea>
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

    const { model, imageUrl, price, weight, phone, condition, description } = Object.fromEntries(
        new FormData(e.currentTarget)  
    );

    try {
        if (model === "" || imageUrl === "" || price === "" || weight === "" || phone === "" || condition === "" || description === "") {
            throw new Error("All fields are required!");
        }

        const res = await fetch(endpoints.editItemDetails(itemId), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("accessToken"),
            },
            body: JSON.stringify({ model, imageUrl, price, weight, phone, condition, description }),
        });

        if (!res.ok) {
            throw new Error(res.status);
        }
        
        page.redirect(`/dashboard/${itemId}`);
    }
    catch (err) {
        console.error(err);
        // alert(err.message);
        displayErrorMessage(err.message);
    }
}