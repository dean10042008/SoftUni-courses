import { endpoints } from "../../api/endpoints.js";
import { html, page, render } from "../../modules/modules.js"

const rootEl = document.querySelector("#root");

const template = () => {
    return html`
       <section id="create">
            <div class="form">
                <img class="border" src="/images/border.png" alt="border">
                <h2>Add Character</h2>
                <form @submit=${handleCreateSubmit} class="create-form">
                    <input type="text" name="category" id="category" placeholder="Character Type" />
                    <input type="text" name="image-url" id="image-url" placeholder="Image URL" />
                    <textarea id="description" name="description" placeholder="Description" rows="2"
                        cols="10"></textarea>
                    <textarea id="additional-info" name="additional-info" placeholder="Additional Info" rows="2"
                        cols="10"></textarea>
                    <button type="submit">Add Character</button>
                </form>
                <img class="border" src="/images/border.png" alt="border">
            </div>
        </section>
    `;
}

export const renderCreate = () => {
    render(template(), rootEl);
}

const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const { category, "image-url": imageUrl, description, "additional-info": moreInfo } = Object.fromEntries(
        new FormData(e.currentTarget)
    );

    try {
        if (category === "" || imageUrl === "" || description === "" || moreInfo === "") {
            throw new Error("All fields are required");
        }

        const response = await fetch(endpoints.createItem, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("accessToken"),
            },
            body: JSON.stringify({ category, imageUrl, description, moreInfo }),
        });

        if (!response.ok) {
            throw new Error("Failed to create solution");
        }

        page.redirect("/dashboard");
    }
    catch (error) {
        console.error(error);
        alert(error.message);
    }
}