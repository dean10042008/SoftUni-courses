import { page, html, render } from "../../modules/modules.js";

const rootEl = document.querySelector("#main-element");

const template = () => {
    return html`
        <section id="hero">
            <p>
                Discover the best deals on drones! Buy, sell, and trade top-quality drones with ease on Drone Deals
                - your
                trusted marketplace for all things drone.</p>
        </section>
    `;
}

export const renderHome = () => {
    render(template(), rootEl);
}