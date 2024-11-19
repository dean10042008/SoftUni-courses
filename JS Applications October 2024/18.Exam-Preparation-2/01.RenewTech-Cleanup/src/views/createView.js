import { endpoints } from "../../api/endpoints.js";
import { html, page, render } from "../../modules/modules.js"

const rootEl = document.querySelector("#root");

const template = () => {
    return html`
       <section id="create">
            <div class="form">
                <img class="border" src="./images/border.png" alt="" />
                <h2>Add Solution</h2>
                <form @submit=${handleCreateSubmit} class="create-form">
                    <input type="text" name="type" id="type" placeholder="Solution Type" />
                    <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
                    <textarea id="description" name="description" placeholder="Description" rows="2" cols="10"></textarea>
                    <textarea id="more-info" name="more-info" placeholder="more Info" rows="2" cols="10"></textarea>
                    <button type="submit">Add Solution</button>
                </form>
            </div>
        </section>
    `;
}

export const renderCreate = () => {
    render(template(), rootEl);
}

const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const { type, "image-url": imageUrl, description, "more-info": learnMore } = Object.fromEntries(
        new FormData(e.currentTarget)
    );

    try {
        if (type === "" || imageUrl === "" || description === "" || learnMore === "") {
            throw new Error("All fields are required");
        }

        const response = await fetch(endpoints.createItem, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("accessToken"),
            },
            body: JSON.stringify({ type, imageUrl, description, learnMore }),
        });

        if (!response.ok) {
            throw new Error("Failed to create solution");
        }

        page.redirect("/solutions");
    }
    catch (error) {
        console.error(error);
        alert(error.message);
    }
}