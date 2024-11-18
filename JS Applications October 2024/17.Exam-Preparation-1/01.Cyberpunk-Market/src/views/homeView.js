import { page, html, render } from "../../modules/modules.js";

const rootEl = document.querySelector("#main-element");

const template = () => {
    return html`
        <section id="hero">
            <img src="./images/home.png" alt="home" />
            <p>We know who you are, we will contact you</p>
        </section>
    `;
}

export const renderHome = () => {
    render(template(), rootEl);
}