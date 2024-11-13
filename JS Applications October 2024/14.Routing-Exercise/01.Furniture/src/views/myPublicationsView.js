import { page, render, html } from "../../modules/modules.js";
import { endpoints } from "../../api/endpoints.js";

const root = document.getElementById("root");

function template(data) {
    return html`
        <div class="container">
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>My Furniture</h1>
                    <p>This is a list of your publications.</p>
                </div>
            </div>
            <div class="row space-top">
                ${
                    data.map(item => html`
                            <div class="col-md-4">
                                <div class="card text-white bg-primary">
                                    <div class="card-body">
                                            <img src=${item.img} />
                                            <p>${item.description}</p>
                                            <footer>
                                                <p>Price: <span>${item.price} $</span></p>
                                            </footer>
                                            <div>
                                                <a @click=${(e) => detailsClick(e, item._id)} href="#" class="btn btn-info">Details</a>
                                            </div>
                                    </div>
                                </div>
                            </div>
                      `)
                }
            </div>
        </div>
    `;
}

export async function renderMyPublications() {
    const data = await getMyPublications();

    render(template(data), root);
}

async function getMyPublications() {
    try {
        const response = await fetch(endpoints.getOwn(localStorage.getItem("userId")));
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

function detailsClick(e, id) {
    e.preventDefault();

    page.redirect(`/catalog/${id}`);
}