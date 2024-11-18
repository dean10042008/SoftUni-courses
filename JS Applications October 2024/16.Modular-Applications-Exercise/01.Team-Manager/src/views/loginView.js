import { endpoints } from "../../api/endpoints.js";
import { page, html, render } from "../../modules/modules.js";

const rootEl = document.getElementById("root");

const template = () => {
    return html`
        <section id="login">
            <article class="narrow">
                <header class="pad-med">
                    <h1>Login</h1>
                </header>
                <form @submit=${handleFormSubmit} id="login-form" class="main-form pad-large">
                    <div class="error" style="display: none">Error message.</div>
                    <label>E-mail: <input type="text" name="email" /></label>
                    <label>Password: <input type="password" name="password" /></label>
                    <input class="action cta" type="submit" value="Sign In" />
                    </form>
                    <footer class="pad-small">
                        Don't have an account? <a href="/register" class="invert">Sign up here</a>
                    </footer>
            </article>
        </section>
  `;
};

export const renderLogin = () => {
    render(template(), rootEl);
};

async function handleFormSubmit(e) {
    e.preventDefault();

    document.querySelector(".error").style.display = "none";

    const { email, password } = Object.fromEntries(
        new FormData(e.currentTarget)
    );

    try {
        await postLoginData(email, password);
    } catch (error) {
        document.querySelector(".error").textContent = error.message;
        document.querySelector(".error").style.display = "block";
    }
}

async function postLoginData(email, password) {
    try {
        const res = await fetch(endpoints.login, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            const data = await res.json();

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("userId", data._id);
            localStorage.setItem("userName", data.username);

            page.redirect("/myTeams");
        }
    } 
    catch (error) {
        alert(error.message);
        throw new Error("Failed to login.");
    }
}