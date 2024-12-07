import { html, render } from "../../modules/modules.js";

const rootEl = document.getElementById("main-element");

const template = () => {
    return html`
        <section id="hero">
            <h1>
                Accelerate Your Passion Unleash the Thrill of Sport Cars Together!
            </h1>
        </section>
    `;
}

export const renderHome = () => {
    render(template(), rootEl);
}