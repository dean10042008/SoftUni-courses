import { endpoints } from "../../api/endpoints.js";
import { html, page, render } from "../../modules/modules.js"

const rootEl = document.querySelector("#root");

const template = (data, likesCount, hasUserLikedItem) => {
    const isOwner = data._ownerId === localStorage.getItem("userId");
    const hasAccessToken = localStorage.getItem("accessToken") !== null;

    return html`
        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src=${data.imageUrl} alt=${data._id} />
                <div>
                    <p id="details-type">${data.type}</p>
                    <div id="info-wrapper">
                        <div id="details-description">
                            <p id="description">${data.description}</p>
                            <p id="more-info">${data.learnMore}</p>
                        </div>
                    </div>
                    <h3>Like Solution:<span id="like">${likesCount}</span></h3>
                    ${
                        isOwner && html`
                            <div id="action-buttons">
                                <a @click=${(e) => handleEditClick(e, data._id)} href="#" id="edit-btn">Edit</a>
                                <a @click=${(e) => handleDeleteClick(e, data._id)} href="#" id="delete-btn">Delete</a>
                            </div>
                        `
                    }
                    ${
                        !isOwner && hasAccessToken && !hasUserLikedItem ? html`
                            <div id="action-buttons">
                                <!--Bonus - Only for logged-in users ( not authors )-->
                                <a @click=${(e) => handleLikeClick(e, data._id)} href="#" id="like-btn">Like</a>
                            </div>
                        `
                        : ""
                    }
                </div>
            </div>
        </section>
    `;
}

export const renderDetails = async (ctx) => {
    const id = ctx.params.id;
    const data = await getSolution(id);
    const likesCount = await getLikeCount(id);
    const hasUserLikedItems = await getLikeInfo(id) === 1;

    render(template(data, likesCount, hasUserLikedItems), rootEl);
}

const getSolution = async (id) => {
    try {
        const response = await fetch(endpoints.getItemDetails(id));

        if (!response.ok) {
            throw new Error(`Failed to fetch solution: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error fetching solution:", error);
        alert(error.message);
    }
}

const handleDeleteClick = async (e, id) => {
    e.preventDefault();

    if (confirm("Are you sure you want to delete this solution?")) {
        try {
            const response = await fetch(endpoints.deleteItem(id), {
                method: "DELETE",
                headers: {
                    "X-Authorization": localStorage.getItem("accessToken"),
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete solution.");
            }

            page.redirect("/solutions");
        }
        catch (error) {
            console.error("Error deleting solution:", error);
            alert(error.message);
        }
    }
}

const handleEditClick = async (e, id) => {
    e.preventDefault();

    page.redirect(`/solutions/edit/${id}`);
}

const getLikeCount = async (id) => {
    try {
        const response = await fetch(endpoints.getItemLikes(id));

        if (!response.ok) {
            throw new Error(`Failed to fetch like count: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error fetching like count:", error);
        alert(error.message);
    }
}

const getLikeInfo = async (id) => {
    try {
        const response = await fetch(endpoints.hasUserLikedItem(id, localStorage.getItem("userId")));
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error fetching like info:", error);
        alert(error.message);
    }
}

const handleLikeClick = async (e, id) => {
    e.preventDefault();

    try {
        const response = await fetch(endpoints.likeItem, {
            method: "POST",
            headers: {
                "X-Authorization": localStorage.getItem("accessToken"),
            },
            body: JSON.stringify({ solutionId: id }),
        });

        if (!response.ok) {
            throw new Error("Failed to like solution.");
        }

        page();
    }
    catch (error) {
        console.error("Error liking solution:", error);
        alert(error.message);
    }
}