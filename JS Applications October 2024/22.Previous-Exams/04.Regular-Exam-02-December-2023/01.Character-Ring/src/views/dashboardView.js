import { endpoints } from "../../api/endpoints.js";
import { html, page, render } from "../../modules/modules.js"

const rootEl = document.querySelector("#root");

const template = (data) => {
    return html`
       <h2>Characters</h2>

       ${html`<section id="characters">
                ${data.length === 0
                ? html`<h2>No added Heroes yet.</h2>`
                : html`
                        ${data.map(item => html`
                                    <div class="character">
                                        <img src=${item.imageUrl} alt=${item._id} />
                                        <div class="hero-info">
                                            <h3 class="category">${item.category}</h3>
                                            <p class="description">${item.description}</p>
                                            <a @click=${(e) => handleDetailsClick(e, item._id)} class="details-btn" href="#">More Info</a>
                                        </div>
                                    </div>
                                `)
                    }`
            }
        </section>
       `};
    `;
}

export const renderDashboard = async () => {
    const data = await getData();
    
    render(template(data), rootEl);
}

const getData = async () => {
    try {
        const response = await fetch(endpoints.getAllItems);
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error("Error fetching solutions:", error);
        alert(error.message);
    }
}

const handleDetailsClick = (e, id) => {
    e.preventDefault();

    page.redirect(`/dashboard/${id}`);
}