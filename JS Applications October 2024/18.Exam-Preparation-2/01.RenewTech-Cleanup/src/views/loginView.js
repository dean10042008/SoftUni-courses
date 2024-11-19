import { html, page, render } from "../../modules/modules.js"
import { endpoints } from "../../api/endpoints.js";

const rootEl = document.querySelector("#root");

const template = () => {
    return html`
       <section id="login">
            <div class="form">
                <img class="border" src="./images/border.png" alt="" />
                <h2>Login</h2>
                <form @submit=${handleFormSubmit} class="login-form">
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

    const { email, password } = Object.fromEntries(
        new FormData(e.currentTarget)
    );

    try {
        if (email === "" || password === "") {
            throw new Error("All fields are required");
        }

        const res = await fetch(endpoints.login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            throw new Error("Failed to login. Please try again later!");
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