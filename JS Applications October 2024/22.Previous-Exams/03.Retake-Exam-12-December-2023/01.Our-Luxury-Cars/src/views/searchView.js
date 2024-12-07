import { endpoints } from "../../api/endpoints.js";
import { html, page, render } from "../../modules/modules.js";

const rootEl = document.getElementById("main-element");

const template = (data = []) => {
    return html`
        <section id="search">
            <div class="form">
                <h2>Search</h2>
                <form @submit=${onSubmit} class="search-form">
                    <input type="text" name="search" id="search-input" />
                    <button class="button-list">Search</button>
                </form>
            </div>
            <div class="search-result">
                ${
                    data.length === 0 ?
                        html`<h2 class="no-avaliable">No result.</h2>` :
                        data.map(item => html`
                            <div class="car">
                                <img src=${item.imageUrl} alt=${item._id} />
                                <h3 class="model">${item.model}</h3>
                                <a @click=${(e) => onDetailsClick(e, item._id)} class="details-btn" href="#">More Info</a>
                            </div>
                        `)
                }
            </div>
        </section>
    `;
}

export const renderSearch = () => {
    render(template(), rootEl);
}

const onSubmit = async (e) => {
    e.preventDefault();

    const { search } = Object.fromEntries(
        new FormData(e.currentTarget)
    );

    try {
        if (search === "") {
            throw new Error("Search query is required.");
        }

        const res = await fetch(endpoints.search(search));

        if ( ! res.ok) throw new Error("Failed to search.");
        console.log(res);

        const data = await res.json();
        render(template(data), rootEl);
    }
    catch (err) {
        alert(err.message);
        console.error(err);
    }
}

const onDetailsClick = (e, showId) => {
    e.preventDefault();
    page.redirect(`/dashboard/${showId}`);
}