import { page, render, html } from "../../modules/modules.js";
import { endpoints } from "../../api/endpoints.js";

const root = document.getElementById("root");

function template() {
    return html`
        <div class="container">
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>Create New Furniture</h1>
                    <p>Please fill all fields.</p>
                </div>
            </div>
            <form @submit=${handleFormSubmit}>
                <div class="row space-top">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-control-label" for="new-make">Make</label>
                            <input class="form-control valid" id="new-make" type="text" name="make">
                        </div>
                        <div class="form-group has-success">
                            <label class="form-control-label" for="new-model">Model</label>
                            <input class="form-control" id="new-model" type="text" name="model">
                        </div>
                        <div class="form-group has-danger">
                            <label class="form-control-label" for="new-year">Year</label>
                            <input class="form-control" id="new-year" type="number" name="year">
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="new-description">Description</label>
                            <input class="form-control" id="new-description" type="text" name="description">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-control-label" for="new-price">Price</label>
                            <input class="form-control" id="new-price" type="number" name="price">
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="new-image">Image</label>
                            <input class="form-control" id="new-image" type="text" name="img">
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="new-material">Material (optional)</label>
                            <input class="form-control" id="new-material" type="text" name="material">
                        </div>
                        <input type="submit" class="btn btn-primary" value="Create" />
                    </div>
                </div>
            </form>
        </div>
    `;
}

export function renderCreate() {
    render(template(), root);
}

function handleFormSubmit(e) {
    e.preventDefault();

    const [makeEl, modelEl, yearEl, descriptionEl, priceEl, imageEl, materialEl] = e.currentTarget.querySelectorAll(".form-control");
    let isFormValid = true;

    if (makeEl.value.length < 4) {
        makeEl.classList.add("is-invalid");
        isFormValid = false;
    }
    else {
        makeEl.classList.remove("is-invalid");
        makeEl.classList.add("is-valid");
    }

    if (modelEl.value.length < 4) {
        modelEl.classList.add("is-invalid");
        isFormValid = false;
    }
    else {
        modelEl.classList.remove("is-invalid");
        modelEl.classList.add("is-valid");
    }

    if (yearEl.value < 1950 || yearEl.value > 2050) {
        yearEl.classList.add("is-invalid");
        isFormValid = false;
    }
    else {
        yearEl.classList.remove("is-invalid");
        yearEl.classList.add("is-valid");
    }

    if (descriptionEl.value.length < 10) {
        descriptionEl.classList.add("is-invalid");
        isFormValid = false;
    }
    else {
        descriptionEl.classList.remove("is-invalid");
        descriptionEl.classList.add("is-valid");
    }

    if (priceEl.value <= 0) {
        priceEl.classList.add("is-invalid");
        isFormValid = false;
    }
    else {
        priceEl.classList.remove("is-invalid");
        priceEl.classList.add("is-valid");
    }

    if (imageEl.value === "") {
        imageEl.classList.add("is-invalid");
        isFormValid = false;
    }
    else {
        imageEl.classList.remove("is-invalid");
        imageEl.classList.add("is-valid");
    }

    materialEl.classList.add("is-valid");

    if (!isFormValid) return;

    finishCreating(Object.fromEntries(new FormData(e.currentTarget)));
    page.redirect("/");
}

async function finishCreating({ make, model, year, description, price, img, material }) {
    await fetch(endpoints.create, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({ make, model, year, description, price, img, material }),
    });
}