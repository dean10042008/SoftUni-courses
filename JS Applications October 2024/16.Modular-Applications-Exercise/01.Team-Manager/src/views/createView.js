import { endpoints } from "../../api/endpoints.js";
import { acceptTeamMember, requestTeamMember } from "../../modules/helpers.js";
import { page, html, render } from "../../modules/modules.js";

const rootEl = document.getElementById("root");

const template = () => {
    return html`
        <section id="create">
            <article class="narrow">
                <header class="pad-med">
                    <h1>New Team</h1>
                </header>
                <form @submit=${handleFormSubmit} id="create-form" class="main-form pad-large">
                    <div class="error" style="display: none">Error message.</div>
                    <label>Team name: <input type="text" name="name"></label>
                    <label>Logo URL: <input type="text" name="logoUrl"></label>
                    <label>Description: <textarea name="description"></textarea></label>
                    <input class="action cta" type="submit" value="Create Team">
                </form>
            </article>
        </section>
    `;
}

export const renderCreate = () => {
    render(template(), rootEl);
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const { name, logoUrl, description } = Object.fromEntries(
        new FormData(e.currentTarget)
    );

    try {
        document.querySelector(".error").style.display = "none";

        if (name.length < 4) {
            throw new Error("Team name should be at least 4 characters long.");
        }

        if (logoUrl === "") {
            throw new Error("Logo URL is required.");
        }

        if (description.length < 10) {
            throw new Error("Description should be at least 10 characters long.");
        }

        await createTeam(name, logoUrl, description);
    }
    catch (error) {
        document.querySelector(".error").textContent = error.message;
        document.querySelector(".error").style.display = "block";
    }
}

async function createTeam(name, logoUrl, description) {
    try {
        const res = await fetch(endpoints.createTeam, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("accessToken")
            },
            body: JSON.stringify({ name, logoUrl, description })
        });

        const data = await res.json();
        const userData = await requestTeamMember(data._id);
        const newUserData = Object.assign({}, userData);
        newUserData.status = "member";
        await acceptTeamMember(newUserData, newUserData._id);

        page.redirect("/myTeams");
    }
    catch (error) {
        throw new Error("Failed to create team.");
    }
}