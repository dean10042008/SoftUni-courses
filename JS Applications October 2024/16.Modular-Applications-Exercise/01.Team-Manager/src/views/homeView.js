import { html, render } from "../../modules/modules.js";

const rootEl = document.getElementById("root");

const template = () => {
    const hasAccessToken = localStorage.getItem("accessToken") !== null;

    return html`
        <section id="home">
            <article class="hero layout">
                <img src="./assets/team.png" class="left-col pad-med">
                <div class="pad-med tm-hero-col">
                    <h2>Welcome to Team Manager!</h2>
                    <p>Want to organize your peers? Create and manage a team for free.</p>
                    <p>Looking for a team to join? Browse our communities and find like-minded people!</p>
                    ${
                        hasAccessToken ?
                        html`<a href="/teams" class="action cta">Browse Teams</a>` :
                        html`<a href="/register" class="action cta">Sign Up Now</a>`
                    }

                </div>
            </article>
        </section>
    `;
}

export const renderHome = () => {
    render(template(), rootEl);
}