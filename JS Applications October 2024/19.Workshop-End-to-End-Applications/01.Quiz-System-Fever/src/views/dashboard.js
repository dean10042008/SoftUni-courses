import { getAll, onDetailsClick } from "../../modules/helpers.js";
import { html, render, page } from "../../modules/modules.js";

const main = document.querySelector('body > #container > #content');

const template = (data = null) => html`
    <section id="browse">
        <header class="pad-large">
            <form @submit=${filterSubmit} class="browse-filter">
                <input class="input" type="text" name="query">
                <select class="input" name="topic">
                    <option value="all">All Categories</option>
                    <option value="lang">Languages</option>
                    <option value="hardware">Hardware</option>
                    <option value="software">Tools and Software</option>
                </select>
                <input class="input submit action" type="submit" value="Filter quizzes">
            </form>
            <h1>All quizzes</h1>
        </header>

        ${data === null ? html`<div class="pad-large alt-page async">
            <div class="sk-cube-grid">
                <div class="sk-cube sk-cube1"></div>
                <div class="sk-cube sk-cube2"></div>
                <div class="sk-cube sk-cube3"></div>
                <div class="sk-cube sk-cube4"></div>
                <div class="sk-cube sk-cube5"></div>
                <div class="sk-cube sk-cube6"></div>
                <div class="sk-cube sk-cube7"></div>
                <div class="sk-cube sk-cube8"></div>
                <div class="sk-cube sk-cube9"></div>
            </div>
        </div>` : data.length !== 0 ? html`
        <div class="pad-large alt-page">
            ${data.map(item => html`
            
                <article class="preview layout">
                    <div class="right-col">
                        <a @click=${(e) => onDetailsClick(e, item.quizId)} class="action cta" href="#">View Quiz</a>
                    </div>
                    <div class="left-col">
                        <h3><a class="quiz-title-link" href="#">${item.title}</a></h3>
                        <span class="quiz-topic">Topic: ${item.topic}</span>
                        <div class="quiz-meta">
                            <span>${item.questionCount} questions</span>
                            <span>|</span>
                            <span>Taken ${item.takenCount} times</span>
                        </div>
                    </div>
                </article>
                `)}
            </div>` : html `<h1 id="no-result" class="preview">No Results Found. Try again.</h1>`
        } 
    </section>
`;

export async function dashboardView() {
    render(template(), main);

    const data = await getAll();

    render(template(data), main);
}

async function filterSubmit(e) {
    render(template(), main);

    e.preventDefault();

    let { query, topic } = Object.fromEntries(
        new FormData(e.currentTarget)
    );

    if (topic === "lang") {
        topic = "languages";
    }

    try {
        const res = await fetch(`http://localhost:5001/data/&&title=${query}&&topic=${topic}`);
        const data = await res.json();

        if (! res.ok) {
            throw new Error(data.message);
        }

        render(template(data.data), main);
    }
    catch (err) {
        alert(err.message);
        console.error(err);
    }
}