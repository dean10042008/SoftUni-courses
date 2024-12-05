import { endpoints } from "../../api/endpoints.js";
import { html, page, render } from "../../modules/modules.js";

const rootEl = document.getElementById("main-element");

const template = () => {
    return html`
        <section id="create">
            <div class="form form-auto">
                <h2>Share Your Car</h2>
                <form @submit=${onSubmit} class="create-form">
                    <input type="text" name="model" id="model" placeholder="Model" />
                    <input type="text" name="imageUrl" id="car-image" placeholder="Your Car Image URL" />
                    <input type="text" name="price" id="price" placeholder="Price in Euro" />
                    <input type="number" name="weight" id="weight" placeholder="Weight in Kg" />
                    <input type="text" name="speed" id="speed" placeholder="Top Speed in Kmh" />
                    <textarea id="about" name="about" placeholder="More About The Car" rows="10" cols="50"></textarea>
                    <button type="submit">Add</button>
                </form>
            </div>
        </section>
    `;
}

export const renderAdd = () => {
    render(template(), rootEl);
}

const onSubmit = async (e) => {
    e.preventDefault();

    const { model, imageUrl, price, weight, speed, about } = Object.fromEntries(
        new FormData(e.currentTarget)  
    );

    try {
        if (model === "" || imageUrl === "" || price === "" || weight === "" || speed === "" || about === "") {
            throw new Error("All fields are required");
        }

        const res = await fetch(endpoints.create, {
            method: 'POST',
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

        if ( ! res.ok) throw new Error("Error creating");

        page.redirect("/dashboard");
    }
    catch(e) {
        alert(e.message);
        console.error(e);
    }
}