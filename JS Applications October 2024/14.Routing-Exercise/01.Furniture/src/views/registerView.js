import { page, render, html } from "../../modules/modules.js";
import { endpoints } from "../../api/endpoints.js";

const root = document.getElementById("root");

function template() {
    return html`
        <div class="container">
            <div class="row space-top">
                <div class="col-md-12">
                    <h1>Register New User</h1>
                    <p>Please fill all fields.</p>
                </div>
            </div>
            <form @submit=${handleFormSubmit}>
                <div class="row space-top">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label class="form-control-label" for="email">Email</label>
                            <input class="form-control" id="email" type="text" name="email">
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="password">Password</label>
                            <input class="form-control" id="password" type="password" name="password">
                        </div>
                        <div class="form-group">
                            <label class="form-control-label" for="rePass">Repeat</label>
                            <input class="form-control" id="rePass" type="password" name="rePass">
                        </div>
                        <input type="submit" class="btn btn-primary" value="Register" />
                    </div>
                </div>
            </form>
        </div>
    `;
}

export function renderRegistration() {
    render(template(), root);
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const { email, password, rePass } = Object.fromEntries(new FormData(e.currentTarget));

    if (password !== rePass) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch(endpoints.register, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        const accessToken = data.accessToken;
        const userId = data._id;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("userId", userId);

        page.redirect("/");
    }
    catch (error) {
        alert(error.message);
    }
}