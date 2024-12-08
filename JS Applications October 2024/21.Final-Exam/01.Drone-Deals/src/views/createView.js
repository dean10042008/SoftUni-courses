import { endpoints } from "../../api/endpoints.js";
import { displayErrorMessage } from "../../modules/helpers.js";
import { page, html, render } from "../../modules/modules.js";

const rootEl = document.querySelector("#main-element");

const template = () => {
    return html`
        <section id="create">
            <div class="form form-item">
                <h2>Add Drone Offer</h2>
                <form @submit=${handleFormSubmit} class="create-form">
                    <input type="text" name="model" id="model" placeholder="Drone Model" />
                    <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" />
                    <input type="number" name="price" id="price" placeholder="Price" />
                    <input type="number" name="weight" id="weight" placeholder="Weight" />
                    <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" />
                    <input type="text" name="condition" id="condition" placeholder="Condition" />
                    <textarea name="description" id="description" placeholder="Description"></textarea>
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

    const { model, imageUrl, price, weight, phone, condition, description } = Object.fromEntries(
        new FormData(e.currentTarget)  
    );

    try {
        if (model === "" || imageUrl === "" || price === "" || weight === "" || phone === "" || condition === "" || description === "") {
            throw new Error("All fields are required!");
        }

        const res = await fetch(endpoints.createItem, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("accessToken"),
            },
            body: JSON.stringify({ model, imageUrl, price, weight, phone, condition, description }),
        });

        if (!res.ok) {
            throw new Error(res.status);
        }
        
        page.redirect("/dashboard");
    }
    catch (err) {
        console.error(err);
        // alert(err.message);
        displayErrorMessage(err.message);
    }
}