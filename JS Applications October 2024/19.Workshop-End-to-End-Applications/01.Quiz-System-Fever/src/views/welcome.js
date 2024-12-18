import { getAll, onDetailsClick } from "../../modules/helpers.js";
import { html, render, page } from "../../modules/modules.js";

const main = document.querySelector('body > #container > #content');

const template = (quizCount, isLoggedIn, recent) => html`
    <section id="welcome">

        <div class="hero layout">
            <div class="splash right-col"><i class="fas fa-clipboard-list"></i></div>
            <div class="glass welcome">
                <h1>Welcome to Quiz Fever!</h1>
                <p>Home to ${quizCount} quizzes in 3 topics. <a href="/browse">Browse all quizzes</a>.</p>
                ${!isLoggedIn ? html`<a class="action cta" href="/login">Sign in to create a quiz</a>` : ""}
            </div>
        </div>

        <div class="pad-large alt-page">
            <h2>Our most recent quiz:</h2>

            <article class="preview layout">
                <div class="right-col">
                    <a @click=${(e) => onDetailsClick(e, recent.quizId)} class="action cta" href="#">View Quiz</a>
                </div>
                <div class="left-col">
                    <h3>${recent.title}</h3>
                    <span class="quiz-topic">Topic: ${recent.topic}</span>
                    <div class="quiz-meta">
                        <span>${recent.questionCount} questions</span>
                        <span>|</span>
                        <span>Taken ${recent.takenCount} times</span>
                    </div>
                </div>
            </article>

            <div>
                <a class="action cta" href="/browse">Browse all quizzes</a>
            </div>
        </div>

    </section>
`;

export async function welcomeView() {
    const quizCount = await getAll();
    const recentData = await getRecentData();
    const isLoggedIn = localStorage.getItem('userData') !== null;

    render(template(quizCount.length, isLoggedIn, recentData.data), main);
}

async function getRecentData() {
    try {
        const response = await fetch("http://localhost:5001/data/quizzes/recent");
        const data = await response.json();
        return data;
    }
    catch(err) {
        console.error(err);
    }
}