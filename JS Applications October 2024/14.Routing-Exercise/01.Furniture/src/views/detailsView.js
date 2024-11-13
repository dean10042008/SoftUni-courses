import { page, render, html } from "../../modules/modules.js";
import { endpoints } from "../../api/endpoints.js";

const root = document.getElementById("root");

function template(data) {
    const isOwner = data._ownerId === localStorage.getItem("userId");

    const actionsDiv = html`
        <div>
            <a @click=${(e) => handleEditClick(e, data._id)} href=”#” class="btn btn-info">Edit</a>
            <a @click=${(e) => handleDeleteClick(e, data._id)} href=”#” class="btn btn-red">Delete</a>
        </div>
    `;

    return html`
        <div class="container">
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>Furniture Details</h1>
                </div>
            </div>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="card text-white bg-primary">
                        <div class="card-body">
                            <img src=${data.img} />
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <p>Make: <span>${data.make}</span></p>
                    <p>Model: <span>${data.model}</span></p>
                    <p>Year: <span>${data.year}</span></p>
                    <p>Description: <span>${data.description}</span></p>
                    <p>Price: <span>${data.price}</span></p>
                    <p>Material: <span>${data.material}</span></p>
                    ${isOwner ? actionsDiv : ""}
                </div>
            </div>
        </div>
    `;
}

export async function renderDetails(ctx) {
    const data = await getProductDetails(ctx);

    render(template(data), root);
}

async function getProductDetails(ctx) {
    const productId = ctx.params.id;
    
    try {
        const response = await fetch(endpoints.details(productId));
        const data = await response.json();
        
        return data;
    }
    catch (error) {
        console.error(error);
    }
};

async function handleEditClick(e, productId) {
    e.preventDefault();
    
    page.redirect(`/catalog/edit/${productId}`);
}

async function handleDeleteClick(e, productId) {
    e.preventDefault();

    if (confirm("Are you sure you want to delete this product?")) {
        try {
            await fetch(endpoints.delete(productId), { 
                method: "DELETE",
                headers: {
                    "X-Authorization": localStorage.getItem("accessToken")
                }
            });
            page.redirect("/");
        }
        catch (error) {
            console.error(error);
        }
    }
}