import { endpoints } from "/api/endpoints.js";
import { html, render, page } from "/modules/modules.js";

const rootEl = document.getElementById("root");

const template = (data) => {
    return html`
        <h2>Collection</h2>
        <section id="tattoos">
            ${
                data.length === 0 ?
                html`<h2 id="no-tattoo">Collection is empty, be the first to contribute</h2>` :
                data.map(item => html`
                    <div class="tattoo">
                        <img src=${item.imageUrl} alt=${item._id} />
                        <div class="tattoo-info">
                            <h3 class="type">${item.type}</h3>
                            <span>Uploaded by </span>
                            <p class="user-type">${item.userType}</p>
                            <a @click=${(e) => onDetailsClick(e, item._id)} class="details-btn" href="#">Learn More</a>
                        </div>
                    </div>
                `)
            }
        </section>
    `;
}

export const dashboardPage = async () => {
    const data = await getItems();

    render(template(data), rootEl);
}

const getItems = async () => {
    try {
        const res = await fetch(endpoints.catalog);
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
    }
}

const onDetailsClick = (e, tattooId) => {
    e.preventDefault();
    page.redirect(`/collection/${tattooId}`);
}