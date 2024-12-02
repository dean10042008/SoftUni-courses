import { endpoints } from "../../api/endpoints.js";
import { html, render, page } from "../../modules/modules.js";

const rootEl = document.getElementById("root");

const template = (data = []) => {
    return html`
        <h2>Users Recommendations</h2>
        ${
            data.length > 0 ?
                html`
                  <section id="shows">
                    ${
                        data.map(item => html`
                            <div class="show">
                                <img src=${item.imageUrl} alt=${item._id} />
                                <div class="show-info">
                                    <h3 class="title">${item.title}</h3>
                                    <p class="genre">Genre: ${item.genre}</p>
                                    <p class="country-of-origin">Country of Origin: ${item.country}</p>
                                    <a @click=${(e) => onDetailsClick(e, item._id)} class="details-btn" href="#">Details</a>
                                </div>
                            </div>
                        `)
                    }
                  </section>  
                ` :
                html`<h2 id="no-show">No shows Added.</h2>`
        }
    `;
}

export const renderShows = async () => {
    const data = await getShowsData();

    if (data) {
        render(template(data), rootEl);
    }
}

const getShowsData = async () => {
    try {
        const res = await fetch(endpoints.catalog);
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
    }
}

const onDetailsClick = (e, showId) => {
    e.preventDefault();
    page.redirect(`/shows/${showId}`);
}