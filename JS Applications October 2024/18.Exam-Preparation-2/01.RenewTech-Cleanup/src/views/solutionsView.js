import { endpoints } from "../../api/endpoints.js";
import { html, page, render } from "../../modules/modules.js"

const rootEl = document.querySelector("#root");

const template = (data) => {
    return html`
       <h2>Solutions</h2>

       ${html`<section id="solutions">
                ${data.length === 0
                ? html`<h2 id="no-solution">No Solutions Added.</h2>`
                : html`
                        ${data.map(solution => html`
                                    <div class="solution">
                                        <img src=${solution.imageUrl} alt=${solution._id} />
                                        <div class="solution-info">
                                            <h3 class="type">${solution.type}</h3>
                                            <p class="description">${solution.description}</p>
                                            <a @click=${(e) => handleDetailsClick(e, solution._id)} class="details-btn" href="#">Learn More</a>
                                        </div>
                                    </div>
                                `)
                    }`
            }
        </section>
       `};
    `;
}

export const renderSolutions = async () => {
    const data = await getSolutionsData();

    render(template(data), rootEl);
}

const getSolutionsData = async () => {
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

    page.redirect(`/solutions/${id}`);
}