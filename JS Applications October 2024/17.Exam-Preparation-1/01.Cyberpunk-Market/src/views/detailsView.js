import { endpoints } from "../../api/endpoints.js";
import { displayErrorMessage } from "../../modules/helpers.js";
import { page, html, render } from "../../modules/modules.js";

const rootEl = document.querySelector("#main-element");

const template = (itemData) => {
    const isOwner = itemData._ownerId === localStorage.getItem("userId");

    const actionButtons = html`
        <div id="action-buttons">
            <a @click=${(e) => handleEditClick(e, itemData._id)} href="" id="edit-btn">Edit</a>
            <a @click=${(e) => deleteItem(e, itemData._id)} href="" id="delete-btn">Delete</a>
        </div>
    `;

    return html`
        <section id="details">
            <div id="details-wrapper">
                <div>
                    <img id="details-img" src=${itemData.imageUrl} alt=${itemData._id} />
                    <p id="details-title">${itemData.item}</p>
                </div>
                <div id="info-wrapper">
                    <div id="details-description">
                        <p class="details-price">Price: €${itemData.price}</p>
                        <p class="details-availability">
                            ${itemData.availability}
                        </p>
                        <p class="type">Type: ${itemData.type}</p>
                        <p id="item-description">${itemData.description}</p>
                    </div>
                    ${isOwner ? actionButtons : ""}
                </div>
            </div>
        </section>
    `;
}

export const renderDetails = async (ctx) => {
    const itemId = ctx.params.itemId;
    const data = await getItem(itemId);

    render(template(data), rootEl);
}

const getItem = async (itemId) => {
    try {
        const res = await fetch(endpoints.getItemDetails(itemId));
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
    }
}

const deleteItem = async (e, itemId) => {
    e.preventDefault();

    if (confirm('Are you sure you want to delete this item?')) {
        try {
            const res = await fetch(endpoints.getItemDetails(itemId), {
                method: "DELETE",
                headers: {
                    "x-Authorization": localStorage.getItem("accessToken")
                }
            });

            if (!res.ok) {
                throw new Error(res.status);
            }

            page.redirect("/market");
        }
        catch (error) {
            console.error("Error:", error);
            // alert(error.message);
            displayErrorMessage(error.message);
        }
    }
}

const handleEditClick = async (e, itemId) => {
    e.preventDefault();

    page.redirect(`/market/edit/${itemId}`);
}