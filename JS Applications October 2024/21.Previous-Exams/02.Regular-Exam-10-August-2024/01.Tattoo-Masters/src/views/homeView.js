import { html, render } from "/modules/modules.js";

const rootEl = document.getElementById("root");

const template = () => {
    return html`
        <section id="home">
            <div id="home-wrapper">
                <p id="home-intro">
                    Whether you're a seasoned artist, a collector of ink, or someone
                    looking for inspiration for their first tattoo,
                    <span>Tattoo Masters</span> is your community. Share your
                    masterpieces, discover incredible designs, and connect with
                    artists and aficionados from around the world.
                </p>
                <a href="/register" id='join-us'>Join Us!</a>
            </div>
        </section>
    `;
}

export const homePage = async () => {
    render(template(), rootEl);
}