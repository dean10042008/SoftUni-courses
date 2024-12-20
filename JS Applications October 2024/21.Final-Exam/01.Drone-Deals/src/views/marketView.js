import { endpoints } from "../../api/endpoints.js";
import { page, html, render } from "../../modules/modules.js";

const rootEl = document.querySelector("#main-element");

const template = (data) => {
    return html`
        <h3 class="heading">Marketplace</h3>
            <section id="dashboard">
                ${
                    data.length > 0 ?
                    html`
                        ${
                            data.map(item => html`
                                <div class="drone">
                                    <img src=${item.imageUrl} alt=${item._id} />
                                    <h3 class="model">${item.model}</h3>
                                    <div class="drone-info">
                                        <p class="price">Price: ${item.price}</p>
                                        <p class="condition">Condition: ${item.condition}</p>
                                        <p class="weight">Weight: ${item.weight}g</p>
                                    </div>
                                    <a @click=${(e) => handleDetailsClick(e, item._id)} class="details-btn" href="#">Details</a>
                                </div>
                            `)
                        }
                    ` :
                    html`<h3 class="no-drones">No Drones Available</h3>`
                }
            </section>
    `;
}

export const renderMarket = async () => {
    const data = await getItems();

    render(template(data), rootEl);
}

const getItems = async () => {
    try {
        const res = await fetch(endpoints.getAllItems);
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
    }
}

const handleDetailsClick = async (e, itemId) => {
    e.preventDefault();
    
    page.redirect(`/dashboard/${itemId}`);
}