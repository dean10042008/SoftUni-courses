import { endpoints } from "../../api/endpoints.js";
import { page, html, render } from "../../modules/modules.js";

const rootEl = document.getElementById("root");

const template = () => {
    return html`
        <section id="register">
            <article class="narrow">
                <header class="pad-med">
                    <h1>Register</h1>
                </header>
                <form @submit=${handleFormSubmit} id="register-form" class="main-form pad-large">
                    <div class="error" style="display: none">Error message.</div>
                    <label>E-mail: <input type="text" name="email"></label>
                    <label>Username: <input type="text" name="username"></label>
                    <label>Password: <input type="password" name="password"></label>
                    <label>Repeat: <input type="password" name="repass"></label>
                    <input class="action cta" type="submit" value="Create Account">
                </form>
                <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a></footer>
            </article>
        </section>
    `;
}

export const renderRegister = () => {
    render(template(), rootEl);
}

async function handleFormSubmit(e) {
    e.preventDefault();

    document.querySelector(".error").style.display = "none";

    const emailPattern = /^[^@]+@[^@]+\.[^@]+$/;

    const { email, username, password, repass } = Object.fromEntries(new FormData(e.currentTarget));

    try {
        if (!emailPattern.test(email)) {
            throw new Error("Invalid email.");
        }

        if (password !== repass) {
            throw new Error("Passwords do not match.");
        }

        if (password.length < 3) {
            throw new Error("Password must be at least 3 characters long.");
        }

        if (username.length < 3) {
            throw new Error("Username must be at least 3 characters long.");
        }

        await postRegisterData(email, username, password);
        page.redirect("/myTeams")
    }
    catch (error) {
        document.querySelector(".error").textContent = error.message;
        document.querySelector(".error").style.display = "block";
    }
}

async function postRegisterData(email, username, password) {
    try {
        const res = await fetch(endpoints.register, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, username, password })
        });

        const data = await res.json();
        
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userId", data._id);
        localStorage.setItem("userName", data.username);
    }
    catch (error) {
        document.querySelector(".error").textContent = error.message;
        document.querySelector(".error").style.display = "block";
    }
}