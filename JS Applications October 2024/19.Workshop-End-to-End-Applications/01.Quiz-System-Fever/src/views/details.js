import { getOne, onProfileClick } from "../../modules/helpers.js";
import { html, render, page } from "../../modules/modules.js";

const main = document.querySelector('body > #container > #content');

const template = (data, isLoggedIn) => {
    const createdDate = new Date(data.quizCreatedOnDate);
    const editedDate = new Date(data.quizEditedOnDate);

    return html`
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
                    <div class="quiz-meta">
                        <span>Created On: ${createdDate.getDate()}. ${(createdDate.toLocaleString('default', { month: 'long' })).slice(0, 3)} ${createdDate.getFullYear()}</span>
                        <span>|</span>
                        <span>Edited On: ${editedDate.getDate()}. ${(editedDate.toLocaleString('default', { month: 'long' })).slice(0, 3)} ${editedDate.getFullYear()}</span>
                    </div>
                    <p class="quiz-desc">${data.description || "N/A"}</p>

                    <div>
                        <a @click=${(e) => onBeginClick(e, data.quizId, data.questionCount)} class="cta action" href="#">Begin Quiz</a>
                    </div>
                </article>
            </div>
        </section>
`};

export async function detailsView(ctx) {
    const quizData = await getOne(ctx.params.id);

    render(template(quizData.data), main);
}

async function onBeginClick(e, quizId, questionCount) {
    e.preventDefault();

    try {
        const headerAuthorization = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem('userData')).accessToken : false;

        const res = await fetch(`http://localhost:5001/data/&&quizIdCheckSolution=${quizId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "x-authorization": headerAuthorization
            }
        });

        const data = await res.json();

        if (questionCount === 0) {
            alert("This quiz has no questions yet. Please try again later.");
            return;
        }

        if (data.hasOwnProperty('data') && data.data === 1) {
            page.redirect(`/browse/compete/${quizId}`);
            return;
        }
        else if (data.hasOwnProperty('data') && data.data === 0) {
            alert(data.message);
            return;
        }
        else {
            alert('You have to be logged-in to solve quizzes.');
            return;
        }

    }
    catch (err) {
        alert(err.message);
        console.error(err);
    }
}