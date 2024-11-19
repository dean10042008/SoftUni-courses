import { page, html, render } from "../../modules/modules.js";
import { endpoints } from "../../api/endpoints.js";
import { displayErrorMessage } from "../../modules/helpers.js";

const rootEl = document.querySelector("#main-element");

const template = () => {
    return html`
        <section id="login">
            <div class="form">
                <h2>Login</h2>
                <form class="login-form" @submit=${handleFormSubmit}>
                    <input type="text" name="email" id="email" placeholder="email" />
                    <input type="password" name="password" id="password" placeholder="password" />
                    <button type="submit">login</button>
                    <p class="message">
                        Not registered? <a href="/register">Create an account</a>
                    </p>
                </form>
            </div>
        </section>
    `;
}

export const renderLogin = () => {
    render(template(), rootEl);
}

const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(e.currentTarget));

    try {
        if (email === "" || password === "") {
            throw new Error("All fields are required!");
        }

        const res = await fetch(endpoints.login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            throw new Error(res.status);
        }
        
        const data = await res.json();
        
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userId", data._id);
        page.redirect("/");
    }
    catch (error) {
        console.error("Error:", error);
        // alert(error.message);
        displayErrorMessage(`Error ${error.message}`);
    }
}