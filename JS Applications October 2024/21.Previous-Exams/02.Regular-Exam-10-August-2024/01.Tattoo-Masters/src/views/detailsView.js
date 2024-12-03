import { endpoints } from "/api/endpoints.js";
import { getTattooData } from "/modules/helpers.js";
import { html, render, page } from "/modules/modules.js";

const rootEl = document.getElementById("root");

const template = (data, hasUserLiked, totalLikes) => {
    const isLoggedIn = localStorage.getItem("accessToken") !== null;
    const isOwner = localStorage.getItem("userId") === data._ownerId;
    
    return html`
        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src=${data.imageUrl} alt=${data._id} />
                <div>
                    <div id="info-wrapper">
                        <p id="details-type">${data.type}</p>
                        <div id="details-description">
                            <p id="user-type">${data.userType}</p>
                            <p id="description">${data.description}</p>
                        </div>
                        <h3>Like tattoo:<span id="like">${totalLikes}</span></h3>
                        ${
                            isLoggedIn ? 
                            html`<div id="action-buttons">
                                ${
                                    isOwner ?
                                    html`
                                        <a @click=${(e) => edit(e, data._id)} href="#" id="edit-btn">Edit</a>
                                        <a @click=${(e) => deleteTattoo(e, data._id)} href="#" id="delete-btn">Delete</a>
                                    ` : ""
                                }
                                ${
                                    !isOwner && isLoggedIn && !hasUserLiked ?
                                    html`
                                        <a @click=${(e) => likeTattoo(e, data._id)} href="#" id="like-btn">Like</a>
                                    ` : ""
                                }
                            </div>` : ""
                        }
                    </div>
                </div>
            </div>
        </section>
    `;
}

export const detailsPage = async (ctx) => {
    const tattooId = ctx.params.tattooId;
    
    const tattooData = await getTattooData(tattooId);
    const hasUserLikedTattoo = await hasUserLiked(tattooId);
    const totalLikes = await getTattooLikeCount(tattooId);

    render(template(tattooData, hasUserLikedTattoo, totalLikes), rootEl);
}

const deleteTattoo = async (e, id) => {
    e.preventDefault();

    if (confirm('Are you sure you want to delete this tattoo?')) {
        try {
            const res = await fetch(endpoints.delete(id), {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "X-Authorization": localStorage.getItem("accessToken"),
                }
            });

            if ( ! res.ok) throw new Error("Failed to delete.");

            page.redirect("/collection");
        }
        catch (err) {
            console.error(err);
        }
    }
}

const edit = (e, id) => {
    e.preventDefault();
    page.redirect(`/collection/edit/${id}`);
}

const hasUserLiked = async (id) => {
    try {
        const res = await fetch(endpoints.userLikes(id, localStorage.getItem('userId')));
        const data = await res.json();
        return data !== 0;
    }
    catch(err) {
        console.error(err);
    }
}

const getTattooLikeCount = async (id) => {
    try {
        const res = await fetch(endpoints.totalLikes(id));
        const data = await res.json();
        return data;
    }
    catch(err) {
        console.error(err);
    }
}

const likeTattoo = async (e, id) => {
    e.preventDefault();

    try {
        const res = await fetch(endpoints.like, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("accessToken"),
            },
            body: JSON.stringify({ tattooId: id })
        });

        if (res.ok) {
            page();
            const data = await res.json();
            console.log(data);
        }
    }
    catch(err) {
        console.error(err);
    }
}