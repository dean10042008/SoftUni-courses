import { html, page, render } from "../../modules/modules.js"
import { endpoints } from "../../api/endpoints.js";

const rootEl = document.querySelector("#root");

const template = () => {
    return html`
       <section id="register">
            <div class="form">
                <img class="border" src="./images/border.png" alt="" />
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

    const { email, password, "re-password": repeatPassword } = Object.fromEntries(
        new FormData(e.currentTarget)
    );

    try {
        if (password !== repeatPassword) {
            throw new Error("Passwords do not match");
        }

        if (email === "" || password === "" || repeatPassword === "") {
            throw new Error("All fields are required");
        }

        const res = await fetch(endpoints.register, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            throw new Error("Failed to register");
        }

        const data = await res.json();
        
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userId", data._id);

        page.redirect("/");
    }
    catch(error) {
        console.error(error);
        alert(error.message);
    }
}