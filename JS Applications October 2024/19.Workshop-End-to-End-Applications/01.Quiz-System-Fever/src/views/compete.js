import { getAllQuestions, getOne } from "../../modules/helpers.js";
import { html, render, page, repeat } from "../../modules/modules.js";

const main = document.querySelector('body > #container > #content');

export let correctQuestionAnswers = [];

let currentQuestionIndex = 0;
let quizId = null;

let quizData = null;
let questionsData = null;

const template = (quizData, singleQuestionData, allQuestionData) => html`
    <section id="quiz">
        <header class="pad-large">
            <h1>${quizData.title}: Question ${currentQuestionIndex + 1} / ${quizData.questionCount}</h1>
            <nav class="layout q-control">
                <span class="block">Question index</span>
                ${allQuestionData.map((questionData, index) => {
    if (currentQuestionIndex > index) {
        return html`<a @click=${(e) => changeQuestion(e, index)} class="q-index q-answered" href="#"></a>`;
    }
    else if (currentQuestionIndex === index) {
        return html`<a @click=${(e) => changeQuestion(e, index)} class="q-index q-current" href="#"></a>`;
    }
    else {
        return html`<a @click=${(e) => changeQuestion(e, index)} class="q-index" href="#"></a>`;
    }
})
    }
            </nav>
        </header>
        <div class="pad-large alt-page">

            <article class="question">
                <p class="q-text">
                    ${singleQuestionData.text}
                </p>

                <div>
    ${repeat(
        singleQuestionData.answers,
        (_, index) => `${currentQuestionIndex}-${index}`,
        (answer, index) => {
            const checked = index === correctQuestionAnswers[currentQuestionIndex];
            return html`
                    <label class="q-answer radio">
                        <input class="input"
                            id="radio-${currentQuestionIndex}-${index}"
                            type="radio" 
                            name="question-${currentQuestionIndex}" 
                            value=${index} 
                            .checked=${checked}>
                        <i class="fas fa-check-circle"></i>
                        ${answer}
                    </label>`;
        }
    )
    }
</div>

                <nav class="q-control">
                    <span class="block">${quizData.questionCount - (currentQuestionIndex + 1)} questions remaining</span>
                    <a @click=${prevQuestion} class="action" href=#><i class="fas fa-arrow-left"></i> Previous</a>
                    <a @click=${startOver} class="action" href=#><i class="fas fa-sync-alt"></i> Start over</a>
                    <div class="right-col">
                        <a @click=${nextQuestion} class="action" href=#>Next <i class="fas fa-arrow-right"></i></a>
                        <a @click=${(e) => submitAnswers(e, quizData.quizId)} class="action" href=#>Submit answers</a>
                    </div>
                </nav>
            </article>

        </div>
    </section>
`;

export async function competeView(ctx) {
    quizId = ctx.params.id;

    quizData = (await getOne(quizId)).data;
    questionsData = (await getAllQuestions(quizId)).data;

    uncheckQuestions(0);
}

function nextQuestion(e) {
    e.preventDefault();

    if (currentQuestionIndex + 1 >= questionsData.length) {
        alert("There are no questions left!");
        return;
    }

    const checkedValue = document.querySelector(".input:checked") ? Number(document.querySelector(".input:checked").value) : null;
    correctQuestionAnswers[currentQuestionIndex] = checkedValue;

    currentQuestionIndex = Math.min(currentQuestionIndex + 1, questionsData.length - 1);
    uncheckQuestions(currentQuestionIndex);
}

function prevQuestion(e) {
    e.preventDefault();

    if (currentQuestionIndex - 1 <= -1) {
        alert("You can't go below zero!");
        return;
    }

    const checkedValue = document.querySelector(".input:checked") ? Number(document.querySelector(".input:checked").value) : null;
    correctQuestionAnswers[currentQuestionIndex] = checkedValue;

    currentQuestionIndex = Math.max(currentQuestionIndex - 1, 0);
    uncheckQuestions(currentQuestionIndex);
}

function changeQuestion(e, index) {
    e.preventDefault();

    if (currentQuestionIndex === index) {
        return;
    }

    const checkedValue = document.querySelector(".input:checked") ? Number(document.querySelector(".input:checked").value) : null;
    correctQuestionAnswers[currentQuestionIndex] = checkedValue;

    currentQuestionIndex = index;
    uncheckQuestions(currentQuestionIndex);
}

function startOver(e) {
    e.preventDefault();

    currentQuestionIndex = 0;
    correctQuestionAnswers = [];
    uncheckQuestions(currentQuestionIndex);
}

function uncheckQuestions(index) {
    const questionEls = Array.from(document.querySelectorAll(".input"));
    questionEls.map(el => el.checked = false);
    render(template(quizData, questionsData[index], questionsData), main);
}

async function submitAnswers(e, quizId) {
    e.preventDefault();

    const checkedValue = document.querySelector(".input:checked") ? Number(document.querySelector(".input:checked").value) : null;
    correctQuestionAnswers[currentQuestionIndex] = checkedValue;

    const [correctAnswersCount] = getTestResults(questionsData);

    try {
        const res = await fetch("http://localhost:5001/data/solutions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-authorization": (JSON.parse(localStorage.getItem("userData"))).accessToken,
            },
            body: JSON.stringify({
                correct: correctAnswersCount,
                quizId,
            })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        page.redirect(`/browse/result/${quizId}`);
    }
    catch (err) {
        alert(err.message);
        console.error(err);
    }
}

export function getTestResults(questionsData) {
    let correctAnswers = 0;

    for (let i = 0; i < questionsData.length; i++) {
        if (questionsData[i].correctIndex === correctQuestionAnswers[i]) {
            correctAnswers++;
        }
    }

    return [correctAnswers, questionsData.length];
}