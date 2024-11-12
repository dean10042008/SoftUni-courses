import page from "//unpkg.com/page/page.mjs";
import { html, render } from 'https://unpkg.com/lit-html';

import auth from "../api/auth.js";

const mainSection = document.querySelector('body main');

const template = () => html`
    <section id="login-section">
        <h2>Login</h2>
        <form @submit=${loginSubmitHandler}>
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <input type="submit" value="Login">
        </form>
    </section>
`;

export default function loginPage() {
    render(template(), mainSection);
}

function loginSubmitHandler(e) {
    e.preventDefault();

    const { email, password } = Object.fromEntries(new FormData(e.currentTarget));

    auth.login(email, password)
        .then(() => {
            page.redirect("/");
        })
        .catch(err => alert(err.message));
};

