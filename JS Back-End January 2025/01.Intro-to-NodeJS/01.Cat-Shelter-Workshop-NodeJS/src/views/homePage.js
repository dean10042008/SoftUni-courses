import { page, html, render } from "../../modules/modules.js";

const mainEl = document.getElementById("root");

const template = (cats) => {
    return html`
        <section class="cats">
            ${
                cats.length === 0 ? html`<p>No cats to show.</p>` : html`
                    <ul>
                        ${
                            cats.map(cat => html`
                                <li>
                                    <img src="${cat.imageUrl}" alt="${cat.name}">
                                    <h3>${cat.name}</h3>
                                    <p><span>Breed: </span>${cat.breed}</p>
                                    <p><span>Description: </span>${cat.description}</p>
                                    <ul class="buttons">
                                        <li @click=${(e) => editClick(e, cat.id)} class="btn edit"><a>Change Info</a></li>
                                        <li @click=${(e) => shelterClick(e, cat.id)} class="btn delete"><a>New Home</a></li>
                                    </ul>
                                </li>
                            `)
                        }
                    </ul>
                `
            }
            
        </section>
    `;
}

export async function homePage() {
    const cats = JSON.parse(localStorage.getItem("searchedCats")) || await getAllCats();
    localStorage.removeItem("searchedCats");

    render(template(cats), mainEl);
}

const getAllCats = async () => {
    try {
        const res = await fetch("http://localhost:5001/getAllCats");
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
    }
}

function editClick(e, id) {
    e.preventDefault();
    page(`/edit/${id}`);
}

function shelterClick(e, id) {
    e.preventDefault();
    page(`/shelter/${id}`);
}