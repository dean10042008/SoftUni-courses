import { html, render, page } from "/modules/modules.js";
import { endpoints } from "/api/endpoints.js";

const rootEl = document.getElementById("root");

const template = () => {
    return html`
        <section id="register">
            <div class="form">
                <h2>Register</h2>
                <form @submit=${onSubmit} class="register-form">
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

export const registerPage = async () => {
    render(template(), rootEl);
}

const onSubmit = async (e) => {
    e.preventDefault();

    const { email, password, "re-password": repeatPass } = Object.fromEntries(
        new FormData(e.currentTarget)
    );

    try {
        if (email === "" || password === "" || repeatPass === "") {
            throw new Error("All fields are required.");
        }

        if (password !== repeatPass) {
            throw new Error("Passwords must match.");
        }

        const response = await fetch(endpoints.register, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password
            })
        });

        if ( ! response.ok) throw new Error("Failed to register.");

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