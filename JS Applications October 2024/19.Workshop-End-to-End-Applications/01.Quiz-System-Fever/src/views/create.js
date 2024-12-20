import { html, render, page } from "../../modules/modules.js";

const main = document.querySelector('body > #container > #content');

const template = () => html`
    <section id="editor">
        <header class="pad-large">
            <h1>New quiz</h1>
        </header>

        <div class="pad-large alt-page">
            <form @submit=${onSubmit}>
                <label class="editor-label layout">
                    <span class="label-col">Title:</span>
                    <input class="input i-med" type="text" name="title">
                </label>
                <label class="editor-label layout">
                    <span class="label-col">Topic:</span>
                    <select class="input i-med" name="topic">
                        <option value="all">All Categories</option>
                        <option value="lang">Languages</option>
                        <option value="hardware">Hardware</option>
                        <option value="software">Tools and Software</option>
                    </select>
                </label>
                <label class="editor-label layout">
                    <span class="label-col">Description:</span>
                    <textarea rows="4" class="input i-med" type="text" name="description"></textarea>
                </label>
                <input class="input submit action" type="submit" value="Save">
            </form>
        </div>
    </section>
`;

export async function createView() {
    render(template(), main);
}

async function onSubmit(e) {
    e.preventDefault();

    let { title, topic, description } = Object.fromEntries(
        new FormData(e.currentTarget),
    );

    try {
        if (title === "" || topic === "" || description === "") {
            throw new Error("All fields are required!");
        }

        if (topic === 'all') {
            topic = 'All Categories';
        }
        if (topic === 'lang') {
            topic = 'Languages';
        }
        if (topic === 'hardware') {
            topic = 'Hardware';
        }
        if (topic === 'software') {
            topic = 'Tools and Software';
        }

        const response = await fetch("http://localhost:5001/data/quizzes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-authorization": JSON.parse(localStorage.getItem("userData")).accessToken,
            },
            body: JSON.stringify({
                title,
                topic,
                description
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        };

        const data = await response.json();
        
        page.redirect(`/browse/edit/${data.data.quizId}`);
    }
    catch (err) {
        alert(err.message);
        console.error(err);
    }
}