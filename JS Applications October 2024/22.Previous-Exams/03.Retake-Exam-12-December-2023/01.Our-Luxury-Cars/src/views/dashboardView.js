import { endpoints } from "../../api/endpoints.js";
import { html, render, page } from "../../modules/modules.js";

const rootEl = document.getElementById("main-element");

const template = (data = []) => {
    return html`
        <h3 class="heading">Our Cars</h3>
        ${
            data.length > 0 ?
                html`
                  <section id="dashboard">
                    ${
                        data.map(item => html`
                            <div class="car">
                                <img src=${item.imageUrl} alt=${item._id} />
                                <h3 class="model">${item.model}</h3>
                                <div class="specs">
                                    <p class="price">Price: €${item.price}</p>
                                    <p class="weight">Weight: ${item.weight} kg</p>
                                    <p class="top-speed">Top Speed: ${item.speed} kph</p>
                                </div>
                                <a @click=${(e) => onDetailsClick(e, item._id)} class="details-btn" href="#">More Info</a>
                            </div>
                        `)
                    }
                  </section>  
                ` :
                html`<h3 class="nothing">Nothing to see yet</h3>`
        }
    `;
}

export const renderDashboard = async () => {
    const data = await getData();

    if (data) {
        render(template(data), rootEl);
    }
}

const getData = async () => {
    try {
        const res = await fetch(endpoints.catalog);
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
    }
}

const onDetailsClick = (e, itemId) => {
    e.preventDefault();
    page.redirect(`/dashboard/${itemId}`);
}