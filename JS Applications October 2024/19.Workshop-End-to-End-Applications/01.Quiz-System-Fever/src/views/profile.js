import { onDetailsClick } from "../../modules/helpers.js";
import { html, render, page } from "../../modules/modules.js";

const main = document.querySelector('body > #container > #content');

const template = (profileData, isUserSame) => html`
    <section id="profile">
        <header class="pad-large">
            <h1>Profile Page</h1>
        </header>

        <div class="hero pad-large">
            <article class="glass pad-large profile">
                <h2>Profile Details</h2>
                <p>
                    <span class="profile-info">Username:</span>
                    ${profileData.username}
                </p>
                <p>
                    <span class="profile-info">Email:</span>
                    ${profileData.email}
                </p>
                
                <h2>${profileData.username} Quiz Results</h2>
                <table class="quiz-results">
                    <tbody>
                        ${
                            profileData.solutionsAndTheirQuizzes && profileData.solutionsAndTheirQuizzes.map(({ solution, quiz }) => {
                                const date = new Date(solution.quizCompletedOnDate);
                                return html`
                                <tr class="results-row">
                                    <td class="cell-1">${date.getDate()}. ${(date.toLocaleString('default', { month: 'long' })).slice(0, 3)} ${date.getFullYear()}</td>
                                    <td class="cell-2"><a @click=${(e) => onDetailsClick(e, quiz.quizId)} href="#">${quiz.title}</a></td>
                                    <td class="cell-3 s-correct">${(solution.correct / quiz.questionCount * 100) || 0}%</td>
                                    <td class="cell-4 s-correct">${solution.correct}/${quiz.questionCount} correct answers</td>
                                </tr>
                            `})
                        }
                        
                    </tbody>
                </table>
            </article>
        </div>
        
        <header class="pad-large">
            <h2>Quizzes created by ${profileData.username}</h2>
        </header>

        <div class="pad-large alt-page">
            ${
                profileData.quizzesOwnedByTheUser && profileData.quizzesOwnedByTheUser.map(quiz => html`
                    <article class="preview layout">
                        ${
                            isUserSame ? html`
                                <div class="right-col">
                                    <a @click=${(e) => onDetailsClick(e, quiz.quizId)} class="action cta" href="#">View Quiz</a>
                                    <a @click=${(e) => editQuiz(e, quiz.quizId)} class="action cta" href="#"><i class="fas fa-edit"></i></a>
                                    <a @click=${(e) => deleteQuiz(e, quiz.quizId)} class="action cta" href="#"><i class="fas fa-trash-alt"></i></a>
                                </div>
                            ` : ""
                        }
                        
                        <div class="left-col">
                            <h3><a @click=${(e) => onDetailsClick(e, quiz.quizId)} class="quiz-title-link" href="#">${quiz.title}</a></h3>
                            <span class="quiz-topic">Topic: ${quiz.topic}</span>
                            <div class="quiz-meta">
                                <span>${quiz.questionCount} questions</span>
                                <span>|</span>
                                <span>Taken ${quiz.takenCount} times</span>
                            </div>
                        </div>
                    </article>
                `)
            }
        </div>

    </section>
`;

export async function profileView(ctx) {
    const username = ctx.params.username;
    const profileData = (await getProfileData(username)).data;

    const isUserSame = localStorage.getItem("userData") ? (profileData.username === JSON.parse(localStorage.getItem('userData')).username) : false;

    render(template(profileData, isUserSame), main);
}

async function getProfileData(username) {
    try {
        const res = await fetch(`http://localhost:5001/data/&&username=${username}`);
        const data = await res.json();

        if ( ! res.ok) {
            throw new Error(data.message);
        }

        return data;
    }
    catch (err) {
        alert(err.message);
        console.error(err);
    }
}

async function deleteQuiz(e, quizId) {
    e.preventDefault();

    if (confirm('Are you sure you want to delete this quiz?')) {
        try {
            const response = await fetch(`http://localhost:5001/data/&&quizIdDelete=${quizId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-authorization': JSON.parse(localStorage.getItem('userData')).accessToken
                },
            });

            const data = await response.json();

            if ( ! response.ok) {
                throw new Error(data.message);
            }

            page();
        }
        catch(err) {
            alert(err.message);
            console.error(err);
        }
    }
}

function editQuiz(e, quizId) {
    e.preventDefault();
    page.redirect(`/browse/edit/${quizId}`);
}