import { endpoints } from "../../api/endpoints.js";
import { page, html, render } from "../../modules/modules.js";

const rootEl = document.getElementById("root");

const template = (teams, members) => {
    const hasAccessToken = localStorage.getItem("accessToken") !== null;

    return html`
        <section id="browse">

            <article class="pad-med">
                <h1>Team Browser</h1>
            </article>

            ${
                hasAccessToken ?
                html`<article class="layout narrow">
                        <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
                    </article>`
                : ""
            }

            ${
                teams.map(team => {
                    const membersCount = (members.filter(member => member.teamId === team._id)).length;

                    return html`
                        <article class="layout">
                            <img src=${team.logoUrl} class="team-logo left-col">
                            <div class="tm-preview">
                                <h2>${team.name}</h2>
                                <p>${team.description}</p>
                                <span class="details">${membersCount} Members</span>
                                <div><a @click=${(e) => handleDetailsClick(e, team._id)} href="#" class="action">See details</a></div>
                            </div>
                        </article>
                `})
            }
            
        </section>
    `;
}

export const renderTeams = async () => {
    const teams = await getTeams();
    const members = await getMembers();

    render(template(teams, members), rootEl);
}

async function getTeams() {
    try {
        const response = await fetch(endpoints.getAllTeams);
        const teams = await response.json();

        return teams;
    }
    catch(error) {
        console.error(error);
    }
}

async function getMembers() {
    try {
        const response = await fetch(endpoints.getAllMembers);
        const members = await response.json();

        return members;
    }
    catch(error) {
        console.error(error);
    }
}

const handleDetailsClick = (e, id) => {
    e.preventDefault();
    page(`/teams/${id}`);
};