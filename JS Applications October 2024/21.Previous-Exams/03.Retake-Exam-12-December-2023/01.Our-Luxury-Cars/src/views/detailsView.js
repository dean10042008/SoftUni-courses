import { endpoints } from "../../api/endpoints.js";
import { getDetails } from "../../modules/helpers.js";
import { html, render, page } from "../../modules/modules.js";

const rootEl = document.getElementById("main-element");

const template = (data) => {
    const isOwner = data._ownerId === localStorage.getItem("userId");

    const ownerBtns = html`
        <div id="action-buttons">
            <a @click=${(e) => onEditClick(e, data._id)} href="" id="edit-btn">Edit</a>
            <a @click=${(e) => deleteShow(e, data._id)} href="" id="delete-btn">Delete</a>
        </div>
    `;

    return html`
        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src=${data.imageUrl} alt=${data._id} />
                <p id="details-title">${data.model}</p>
                <div id="info-wrapper">
                    <div id="details-description">
                        <p class="price">Price: €${data.price}</p>
                        <p class="weight">Weight: ${data.weight} kg</p>
                        <p class="top-speed">Top Speed: ${data.speed} kph</p>
                        <p id="car-description">${data.about}</p>
                    </div>

                    ${isOwner ? ownerBtns : ""}
                </div>
            </div>
        </section>
    `;
}

export const renderDetails = async (ctx) => {
    const itemId = ctx.params.itemId;
    const data = await getDetails(itemId);

    render(template(data), rootEl);
}

const deleteShow = async (e, itemId) => {
    e.preventDefault();

    if (confirm('Are you sure you want to delete this item?')) {
        try {
            const res = await fetch(endpoints.delete(itemId), {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "X-Authorization": localStorage.getItem("accessToken"),
                }
            });

            if ( ! res.ok) throw new Error("Failed to delete.");

            page.redirect("/dashboard");
        }
        catch (error) {
            alert(error.message);
            console.error(error);
        }
    }
}

const onEditClick = (e, itemId) => {
    e.preventDefault();
    page.redirect(`/dashboard/edit/${itemId}`);
}