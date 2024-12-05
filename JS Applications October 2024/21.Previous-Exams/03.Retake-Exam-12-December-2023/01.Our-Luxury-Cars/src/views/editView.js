import { endpoints } from "../../api/endpoints.js";
import { getDetails } from "../../modules/helpers.js";
import { html, page, render } from "../../modules/modules.js";

const rootEl = document.getElementById("main-element");

const template = (data) => {
    return html`
        <section id="edit">
            <div class="form form-auto">
                <h2>Edit Your Car</h2>
                <form @submit=${(e) => onSubmit(e, data._id)} class="edit-form">
                    <input type="text" name="model" id="model" placeholder="Model" value=${data.model} />
                    <input type="text" name="imageUrl" id="car-image" placeholder="Your Car Image URL" value=${data.imageUrl} />
                    <input type="text" name="price" id="price" placeholder="Price in Euro" value=${data.price} />
                    <input type="number" name="weight" id="weight" placeholder="Weight in Kg" value=${data.weight} />
                    <input type="text" name="speed" id="speed" placeholder="Top Speed in Kmh" value=${data.speed} />
                    <textarea id="about" name="about" placeholder="More About The Car" rows="10" cols="50">${data.about}</textarea>
                    <button type="submit">Edit</button>
                </form>
            </div>
        </section>
    `;
}

export const renderEdit = async (ctx) => {
    const itemId = ctx.params.itemId;
    const data = await getDetails(itemId);

    render(template(data), rootEl);
}

const onSubmit = async (e, itemId) => {
    e.preventDefault();

    const { model, imageUrl, price, weight, speed, about } = Object.fromEntries(
        new FormData(e.currentTarget)  
    );

    try {
        if (model === "" || imageUrl === "" || price === "" || weight === "" || speed === "" || about === "") {
            throw new Error("All fields are required");
        }

        const res = await fetch(endpoints.delete(itemId), {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("accessToken")
            },
            body: JSON.stringify({
                model,
                imageUrl,
                price,
                weight,
                speed,
                about,
            })
        });

        if ( ! res.ok) throw new Error("Error editing.");

        page.redirect(`/dashboard/${itemId}`);
    }
    catch(e) {
        alert(e.message);
        console.error(e);
    }
}