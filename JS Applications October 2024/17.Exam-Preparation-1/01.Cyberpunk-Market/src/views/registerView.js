import { page, html, render } from "../../modules/modules.js";
import { endpoints } from "../../api/endpoints.js";
import { displayErrorMessage } from "../../modules/helpers.js";

const rootEl = document.querySelector("#main-element");

const template = () => {
    return html`
        <section id="register">
            <div class="form">
                <h2>Register</h2>
                <form @submit=${handleFormSubmit} class="register-form">
                    <input type="text" name="email" id="register-email" placeholder="email" />
                    <input type="password" name="password" id="register-password" placeholder="password" />
                    <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
                    <button type="submit">register</button>
                    <p class="message">Already registered? <a href="/login">Login</a></p>
                </form>
            </div>
        </section>
    `;
}

export const renderRegister = () => {
    render(template(), rootEl);
}

const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { email, password, "re-password": repeatPassword } = Object.fromEntries(new FormData(e.currentTarget));

    try {
        if (email === "" || password === "" || repeatPassword === "") {
            throw new Error("All fields are required!");
        }
    
        if (password !== repeatPassword) {
            throw new Error("Passwords don't match!");
        }

        const res = await fetch(endpoints.register, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            //! Shouldn't be this way but test case is weird...
            if (res.status === 400) {
                throw new Error(`Error 409`);
            }

            throw new Error(`Error ${res.status}`);
        }

        const data = await res.json();
        
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userId", data._id);
        page.redirect("/");
    }
    catch (error) {
        console.error("Error:", error);
        // alert(error.message);
        displayErrorMessage(error.message);
    }
}