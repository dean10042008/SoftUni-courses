import { endpoints } from "../../api/endpoints.js";
import { getShowDetails } from "../../modules/helpers.js";
import { html, render, page } from "../../modules/modules.js";

const rootEl = document.getElementById("root");

const template = (data) => {
    const isOwner = data._ownerId === localStorage.getItem("userId");

    const ownerBtns = html`
        <div id="action-buttons">
            <a @click=${(e) => onEditClick(e, data._id)} href="#" id="edit-btn">Edit</a>
            <a @click=${(e) => deleteShow(e, data._id)} href="#" id="delete-btn">Delete</a>
        </div>
    `;

    return html`
        <section id="details">
                <div id="details-wrapper">
                    <img id="details-img" src=${data.imageUrl} alt=${data._id} />
                    <div id="details-text">
                        <p id="details-title">${data.title}</p>
                        <div id="info-wrapper">
                            <div id="description">
                                <p id="details-description">${data.details}</p>
                            </div>
                        </div>

                        ${isOwner ? ownerBtns : ""}
                    </div>
                </div>
            </section>
    `;
}

export const renderDetails = async (ctx) => {
    const showId = ctx.params.showId;
    const showData = await getShowDetails(showId);

    render(template(showData), rootEl);
}

const deleteShow = async (e, showId) => {
    e.preventDefault();

    if (confirm('Are you sure you want to delete this show?')) {
        try {
            const res = await fetch(endpoints.delete(showId), {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "X-Authorization": localStorage.getItem("accessToken"),
                }
            });

            if ( ! res.ok) throw new Error("Failed to delete.");

            page.redirect("/shows");
        }
        catch (error) {
            alert(error.message);
            console.error(error);
        }
    }
}

const onEditClick = (e, showId) => {
    e.preventDefault();
    page.redirect(`/shows/edit/${showId}`);
}