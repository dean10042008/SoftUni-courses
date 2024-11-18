import { endpoints } from "../../api/endpoints.js";
import { acceptTeamMember, requestTeamMember } from "../../modules/helpers.js";
import { page, html, render } from "../../modules/modules.js";

const rootEl = document.getElementById("root");

const template = (teamId, teamData) => {
    return html`
        <section id="edit">
            <article class="narrow">
                <header class="pad-med">
                    <h1>Edit Team</h1>
                </header>
                <form @submit=${(e) => handleFormSubmit(e, teamId)} id="edit-form" class="main-form pad-large">
                    <div class="error" style="display: none">Error message.</div>
                    <label>Team name: <input type="text" name="name" value=${teamData.name}></label>
                    <label>Logo URL: <input type="text" name="logoUrl" value=${teamData.logoUrl}></label>
                    <label>Description: <textarea name="description">${teamData.description}</textarea></label>
                    <input class="action cta" type="submit" value="Save Changes">
                </form>
            </article>
        </section>
    `;
}

export const renderEdit = async (ctx) => {
    const teamId = ctx.params.teamId;
    const teamData = await getDataForTeam(teamId);

    render(template(teamId, teamData), rootEl);
}

async function handleFormSubmit(e, id) {
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

        const res = await fetch(endpoints.getDetails(id), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("accessToken"),
            },
            body: JSON.stringify({ name, logoUrl, description }),
        });

        if (res.ok) {
            page.redirect(`/teams/${id}`);
        }
    }
    catch (error) {
        document.querySelector(".error").textContent = error.message;
        document.querySelector(".error").style.display = "block";
    }
}

async function getDataForTeam(id) {
    try {
        const res = await fetch(endpoints.getDetails(id));
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.error(error);
    }
}