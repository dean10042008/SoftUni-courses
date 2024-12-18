import { getAllQuestions, getOne } from "../../modules/helpers.js";
import { html, render, page } from "../../modules/modules.js";
import { correctQuestionAnswers, getTestResults } from "./compete.js";

const main = document.querySelector('body > #container > #content');

let shouldShowDetails = [];

let quizId = null;
let quizData = null;
let questionsData = null;
let correctAnswersCount, quizLength = null;

const template = (correctAnswersCount, quizLength, quizId, questionsData, quizData) => html`
    <section id="summary">
        <div class="hero layout">
            <article class="details glass">
                <h1>${quizData.title}</h1>
                <h2>${quizData.topic}</h2>

                <div class="summary summary-top">
                    ${((correctAnswersCount / quizLength) * 100).toFixed(1)}%
                </div>

                <div class="summary">
                    ${correctAnswersCount}/${quizLength} correct answers
                </div>

                <a @click=${(e) => retakeQuiz(e, quizId)} class="action cta" href="#"><i class="fas fa-sync-alt"></i> Retake Quiz</a>
                <a class="action cta" href="#result-details"><i class="fas fa-clipboard-list"></i> See Details</a>

            </article>
        </div>

        <div class="pad-large alt-page" id="result-details">
            ${
                questionsData.map((question, index) => html`
                    <article class="preview">
                        <span class="s-${correctQuestionAnswers[index] === question.correctIndex ? "correct" : "incorrect"}">
                            Question ${index + 1}
                            ${correctQuestionAnswers[index] === question.correctIndex ? html`<i class="fas fa-check"></i>` : html`<i class="fas fa-times"></i>`}
                        </span>
                        <div class="right-col">
                            <button @click=${() => toggleDetails(index)} class="action">${shouldShowDetails[index] ? "Close" : correctQuestionAnswers[index] === question.correctIndex ? "See question" : "Reveal Answer"}</button>
                        </div>
                        ${shouldShowDetails[index] ? html`<div>
                            <p>
                                ${question.text}
                            </p>
                            ${
                                question.answers.map((answer, answerIndex) => {
                                    const userHasClickedOnCorrectAnswer = answerIndex === question.correctIndex;
                                    
                                    
                                    return html`
                                        <div class="s-answer">
                                            <span class="s-${userHasClickedOnCorrectAnswer ? "correct" : answerIndex === correctQuestionAnswers[index] ? "incorrect" : ""}">
                                                ${answer}
                                                ${
                                                    userHasClickedOnCorrectAnswer ? html`
                                                        <i class="fas fa-check"></i>
                                                        <strong>Correct answer</strong>
                                                    ` : answerIndex === correctQuestionAnswers[index] ? html`
                                                        <i class="fas fa-times"></i>
                                                        <strong>Your choice</strong>
                                                    ` : ""
                                                }
                                            </span>
                                        </div>
                                    `})
                            }
                        </div>` : ""}
                    </article>
                `)
            }
        </div>

    </section>
`;

export async function resultView(ctx) {
    quizId = ctx.params.id;
    quizData = (await getOne(quizId)).data;
    questionsData = (await getAllQuestions(quizId)).data;
    [ correctAnswersCount, quizLength ] = getTestResults(questionsData);

    render(template(correctAnswersCount, quizLength, quizId, questionsData, quizData), main);
}

function retakeQuiz(e, quizId) {
    e.preventDefault();

    page.redirect(`/browse/${quizId}`);
}

function toggleDetails(index) {
    shouldShowDetails[index] = !shouldShowDetails[index];
    render(template(correctAnswersCount, quizLength, quizId, questionsData, quizData), main);
}