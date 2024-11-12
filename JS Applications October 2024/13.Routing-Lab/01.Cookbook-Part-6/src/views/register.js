import page from "//unpkg.com/page/page.mjs";
import { html, render } from 'https://unpkg.com/lit-html';

import auth from "../api/auth.js";

const mainSection = document.querySelector('body main');

const template = () => html`
    <section id="register-section">
        <h2>Register</h2>
        <form @submit=${formSubmitHandler}>
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="rePass"></label>
            <input type="submit" value="Register">
        </form>
    </section>
`;

export default function registerPage() {
    render(template(), mainSection);
}

function formSubmitHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    auth.register(formData.get('email'), formData.get('password'))
        .then(() => {
            page.redirect("/");
        })
        .catch(err => alert(err.message));
};
