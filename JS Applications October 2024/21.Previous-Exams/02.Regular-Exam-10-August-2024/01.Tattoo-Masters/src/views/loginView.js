import { html, render, page } from "/modules/modules.js";
import { endpoints } from "/api/endpoints.js";

const rootEl = document.getElementById("root");

const template = () => {
    return html`
        <section id="login">
            <div class="form">
                <h2>Login</h2>
                <form @submit=${onSubmit} class="login-form">
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

export const loginPage = async () => {
    render(template(), rootEl);
}

const onSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = Object.fromEntries(
        new FormData(e.currentTarget)
    );

    try {
        if (email === "" || password === "") {
            throw new Error("All fields are required.");
        }

        const response = await fetch(endpoints.login, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password
            })
        });

        if ( ! response.ok) throw new Error("Failed to login.");

        const data = await response.json();

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem("userId", data._id);

        page.redirect("/");
    }
    catch(err) {
        alert(err.message);
        console.error(err);
    }
}