import { getAllQuestions } from "../../modules/helpers.js";
import { html, render, page } from "../../modules/modules.js";

const main = document.querySelector('body > #container > #content');

let correctIndex = null;
let minAnswerCount = [{}, {}, {}];

let isBeingEdit = [];

const template = (data, quizId) => html`
    <section id="editor">

        <header class="pad-large">
            <h2>Questions</h2>
        </header>

        <div class="pad-large alt-page">

            ${isBeingEdit.map((_, i) => {
    const item = data[i];

    return !isBeingEdit[i] ? html`
                        <article class="editor-question">
                            <div class="layout">
                                <div class="question-control">
                                    <button @click=${(e) => editQuestion(e, data, quizId, i)} class="input submit action"><i class="fas fa-edit"></i> Edit</button>
                                    <button @click=${(e) => deleteQuestion(e, item.questionId, i)} class="input submit action"><i class="fas fa-trash-alt"></i> Delete</button>
                                </div>
                                <h3>Question ${i + 1}</h3>
                            </div>
                            <form>
                                <p class="editor-input">${item.text}</p>
                                ${item.answers.map((answer, answerIndex) => {
        const checked = answerIndex === item.correctIndex;

        return checked ? html`
                                            <div class="editor-input">
                                                <label class="radio">
                                                    <input checked class="input" type="radio" name="question-2" value="0" disabled />
                                                    <i class="fas fa-check-circle"></i>
                                                </label>
                                                <span>${answer}</span>
                                            </div>
                                        ` : html`
                                            <div class="editor-input">
                                                <label class="radio">
                                                    <input class="input" type="radio" name="question-2" value="0" disabled />
                                                    <i class="fas fa-check-circle"></i>
                                                </label>
                                                <span>${answer}</span>
                                            </div>
                                        `
    })
        }
                            </form>
                        </article>
                ` : item === undefined ? html`
                    <article class="editor-question">
                        <div class="layout">
                            <div class="question-control">
                                <button @click=${(e) => saveChanges(e, quizId, i)} class="input submit action"><i class="fas fa-check-double"></i>
                                    Save</button>
                                <button @click=${(e) => cancelChanges(e, i)} class="input submit action"><i class="fas fa-times"></i> Cancel</button>
                            </div>
                            <h3>Question ${i + 1}</h3>
                        </div>
                        <form>
                            <textarea class="input editor-input editor-text" name="text"
                                placeholder="Enter question">${item ? item.text : ""}</textarea>
                            
                            ${minAnswerCount.map((answer, answerIndex) =>
            answer !== null ? html`
                                    <div class="editor-input">

                                        <label class="radio">
                                            <input class="input" type="radio" name="question-1" value=${answerIndex} />
                                            <i class="fas fa-check-circle" @click=${changeCorrect}></i>
                                        </label>

                                        <input class="input" type="text" name="answer-0" />
                                        <button @click=${(e) => deleteAnswer(e, data, quizId, answerIndex)} class="input submit action"><i class="fas fa-trash-alt"></i></button>
                                    </div>
                                ` : "")}
                            <div class="editor-input">
                                <button @click=${(e) => addAnswer(e, data, quizId)} class="input submit action">
                                    <i class="fas fa-plus-circle"></i>
                                    Add answer
                                </button>
                            </div>
                        </form>

                    </article>
                ` : html`
                    <article class="editor-question">
                        <div class="layout">
                            <div class="question-control">
                                <button @click=${(e) => editChanges(e, quizId, i, item.questionId)} class="input submit action"><i class="fas fa-check-double"></i>
                                    Save</button>
                                <button @click=${(e) => cancelChanges(e, i)} class="input submit action"><i class="fas fa-times"></i> Cancel</button>
                            </div>
                            <h3>Question ${i + 1}</h3>
                        </div>
                        <form>
                            <textarea class="input editor-input editor-text" name="text"
                                placeholder="Enter question">${item.text}</textarea>
                            
                            ${item.answers.map((answer, answerIndex) =>
                html`
                                    <div class="editor-input">
                                        ${answerIndex === item.correctIndex ?
                        html`
                                                <label class="radio">
                                                    <input checked class="input" type="radio" name="question-1" value=${answerIndex} />
                                                    <i class="fas fa-check-circle" @click=${changeCorrect}></i>
                                                </label>
                                            ` :
                        html`
                                                <label class="radio">
                                                    <input class="input" type="radio" name="question-1" value=${answerIndex} />
                                                    <i class="fas fa-check-circle" @click=${changeCorrect}></i>
                                                </label>
                                            `
                    }
                                        
                                        <input class="input" type="text" name="answer-0" value=${answer ? answer : ""} />
                                        <button @click=${(e) => deleteAnswer(e, data, quizId, answerIndex)} class="input submit action"><i class="fas fa-trash-alt"></i></button>
                                    </div>
                            `)}
                            <div class="editor-input">
                                <button @click=${(e) => addEditAnswer(e, data, quizId, item.answers)} class="input submit action">
                                    <i class="fas fa-plus-circle"></i>
                                    Add answer
                                </button>
                            </div>
                        </form>

                    </article>
                `
})
    }

            <article class="editor-question">
                <div class="editor-input">
                    <button @click=${() => addQuestion(data, quizId)} class="input submit action">
                        <i class="fas fa-plus-circle"></i>
                        Add question
                    </button>
                </div>
            </article>

            <button @click=${() => doneEditing(quizId)} class="done-btn action">Done</button>
        </div>

    </section>
`;

export async function editView(ctx) {
    const questionData = await getAllQuestions(ctx.params.id);
    isBeingEdit = [];

    if (questionData.data.length === 0) {
        isBeingEdit[0] = true;
    }

    questionData.data.forEach((_, i) => {
        isBeingEdit[i] = false;
    })

    render(template(questionData.data, ctx.params.id), main);
}

async function saveChanges(e, quizId, index) {
    e.preventDefault();

    const answers = Array.from(e.target.closest(".editor-question").querySelectorAll("input.input[type='text']")).map(item => item.value);
    const text = e.target.closest(".editor-question").querySelector(".editor-text").value;
    const isValidAnswers = Array.isArray(answers) && answers.every(question => typeof question === 'string' && question !== '');
    const isValidCorrectIndex = (correctIndex >= 0 && correctIndex < answers.length) && typeof correctIndex === 'number';

    try {
        if (!isValidAnswers || text === "" || !isValidCorrectIndex) {
            throw new Error("All fields are required! Answers must be atleast 2!");
        }

        const response = await fetch("http://localhost:5001/data/questions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-authorization": JSON.parse(localStorage.getItem("userData")).accessToken,
            },
            body: JSON.stringify({
                answers,
                text,
                quizId,
                correctIndex
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message);
        }

        isBeingEdit[index] = false;
        page();
    }
    catch (err) {
        alert(err.message);
        console.error(err);
    }
}

async function editChanges(e, quizId, index, questionId) {
    e.preventDefault();

    const answers = Array.from(e.target.closest(".editor-question").querySelectorAll("input.input[type='text']")).map(item => item.value);
    const text = e.target.closest(".editor-question").querySelector(".editor-text").value;

    try {
        const response = await fetch("http://localhost:5001/data/questions", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-authorization": JSON.parse(localStorage.getItem("userData")).accessToken,
            },
            body: JSON.stringify({
                answers,
                text,
                quizId,
                correctIndex,
                questionId
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        isBeingEdit[index] = false;
        page();
    }
    catch (err) {
        alert(err.message);
        console.error(err);
    }
}

function cancelChanges(e, index) {
    e.preventDefault();
    isBeingEdit.splice(index, 1);
    page();
}

function changeCorrect(e) {
    const clickedAnswerEl = e.target.closest(".editor-input");
    const allAnswers = Array.from(clickedAnswerEl.closest("form").querySelectorAll("div.editor-input")).slice(0, -1);
    correctIndex = allAnswers.indexOf(clickedAnswerEl);
}

function addQuestion(data, quizId) {
    isBeingEdit[data.length] = true;
    minAnswerCount = [{}, {}, {}];
    render(template(data, quizId), main);
}

function addAnswer(e, data, quizId) {
    e.preventDefault();

    minAnswerCount.push({});
    render(template(data, quizId), main);
}

function addEditAnswer(e, data, quizId, answers) {
    e.preventDefault();

    answers.push(null);
    render(template(data, quizId), main);
}

function deleteAnswer(e, data, quizId) {
    e.preventDefault();
    e.target.closest(".editor-input").remove();
    render(template(data, quizId), main);
}

function editQuestion(e, data, quizId, index) {
    e.preventDefault();
    isBeingEdit[index] = true;
    render(template(data, quizId), main);
}

async function deleteQuestion(e, questionId, index) {
    e.preventDefault();

    if (confirm("Are you sure you want to delete this question?")) {
        try {
            const res = await fetch(`http://localhost:5001/data/&&questionIdDelete=${questionId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "x-authorization": JSON.parse(localStorage.getItem("userData")).accessToken
                }
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            isBeingEdit.splice(index, 1);
            page();
        }
        catch (err) {
            alert(err.message);
            console.error(err);
        }
    }
}

function doneEditing(quizId) {
    //TODO: Change this to redirect to profile page!
    page.redirect("/browse");
}