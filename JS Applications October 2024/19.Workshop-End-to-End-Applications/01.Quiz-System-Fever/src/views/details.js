import { getOne, onProfileClick } from "../../modules/helpers.js";
import { html, render, page } from "../../modules/modules.js";

const main = document.querySelector('body > #container > #content');

const template = (data, isLoggedIn) => html`
    <section id="details">
        <div class="pad-large alt-page">
            <article class="details">
                <h1>${data.title}</h1>
                <span class="quiz-topic">A quiz by <a @click=${(e) => onProfileClick(e, false, data.quizOwnerUsername)} href="#">${data.quizOwnerUsername || "N/A"}</a> on the topic of ${data.topic}</span>
                <div class="quiz-meta">
                    <span>${data.questionCount} Questions</span>
                    <span>|</span>
                    <span>Taken ${data.takenCount} times</span>
                </div>
                <p class="quiz-desc">${data.description || "N/A"}</p>

                ${isLoggedIn ? html`<div>
                    <a @click=${(e) => onBeginClick(e, data.quizId)} class="cta action" href="#">Begin Quiz</a>
                </div>` : ""}
            </article>
        </div>
    </section>
`;

export async function detailsView(ctx) {
    const quizData = await getOne(ctx.params.id);
    const isLoggedIn = localStorage.getItem('userData') !== null;

    render(template(quizData.data, isLoggedIn), main);
}

function onBeginClick(e, id) {
    e.preventDefault();
    page.redirect(`/browse/compete/${id}`);
}