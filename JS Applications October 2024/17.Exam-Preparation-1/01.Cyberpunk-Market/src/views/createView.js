import { endpoints } from "../../api/endpoints.js";
import { displayErrorMessage } from "../../modules/helpers.js";
import { page, html, render } from "../../modules/modules.js";

const rootEl = document.querySelector("#main-element");

const template = () => {
    return html`
        <section id="create">
            <div class="form form-item">
                <h2>Share Your item</h2>
                <form @submit=${handleFormSubmit} class="create-form">
                    <input type="text" name="item" id="item" placeholder="Item" />
                    <input type="text" name="imageUrl" id="item-image" placeholder="Your item Image URL" />
                    <input type="text" name="price" id="price" placeholder="Price in Euro" />
                    <input type="text" name="availability" id="availability"
                        placeholder="Availability Information" />
                    <input type="text" name="type" id="type" placeholder="Item Type" />
                    <textarea id="description" name="description" placeholder="More About The Item" rows="10"
                        cols="50"></textarea>
                    <button type="submit">Add</button>
                </form>
            </div>
        </section>
    `;
}

export const renderCreate = () => {
    render(template(), rootEl);
}

const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { item, imageUrl, price, availability, type, description } = Object.fromEntries(
        new FormData(e.currentTarget)  
    );

    try {
        if (item === "" || imageUrl === "" || price === "" || availability === "" || type === "" || description === "") {
            throw new Error("All fields are required!");
        }

        const res = await fetch(endpoints.createItem, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("accessToken"),
            },
            body: JSON.stringify({ item, imageUrl, price, availability, type, description }),
        });

        if (!res.ok) {
            throw new Error(res.status);
        }
        
        page.redirect("/market");
    }
    catch (err) {
        console.error(err);
        // alert(err.message);
        displayErrorMessage(err.message);
    }
}