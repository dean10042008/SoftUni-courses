import { endpoints } from "../../api/endpoints.js";
import { html, page, render } from "../../modules/modules.js";

const rootEl = document.getElementById("root");

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
            <h4>Results:</h4>
            <div class="search-result">
                ${
                    data !== null ? data.length === 0 ?
                        html`<p class="no-result">There is no TV show with this title</p>` :
                        data.map(show => html`
                            <div class="show">
                                <img src=${show.imageUrl} alt=${show._id} />
                                <h3 class="title">${show.title}</h3>
                                <p class="genre">Genre: ${show.genre}</p>
                                <p class="country-of-origin">Country of Origin: ${show.country}</p>
                                <a @click=${(e) => onDetailsClick(e, show._id)} class="details-btn" href="#">Details</a>
                            </div>
                        `) : ""
                }
            </div>
        </section>
    `;
}

export const renderSearch = () => {
    render(template(null), rootEl);
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
    page.redirect(`/shows/${showId}`);
}