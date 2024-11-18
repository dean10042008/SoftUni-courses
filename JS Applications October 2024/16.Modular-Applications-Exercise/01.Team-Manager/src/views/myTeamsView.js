import { endpoints } from "../../api/endpoints.js";
import { page, render, html } from "../../modules/modules.js";

const rootEl = document.getElementById("root");

const template = (data) => {
    return html`
        <section id="my-teams">

            <article class="pad-med">
                <h1>My Teams</h1>
            </article>

            ${
                data.length === 0
                    ? html`
                        <article class="layout narrow">
                            <div class="pad-med">
                                <p>You are not a member of any team yet.</p>
                                <p><a href="/teams">Browse all teams</a> to join one, or use the button below to create your own team.</p>
                            </div>
                            <div><a href="/create" class="action cta">Create Team</a></div>
                        </article>
                      `
                    : html`
                        ${data.map((team) => html`
                            <article class="layout">
                                <img src=${team.team.logoUrl} class="team-logo left-col">
                                <div class="tm-preview">
                                    <h2>${team.team.name}</h2>
                                    <p>${team.team.description}</p>
                                    <span class="details">${team.memberCount} Members</span>
                                    <div><a @click=${(e) => handleDetailsClick(e, team.teamId)} href="#" class="action">See details</a></div>
                                </div>
                            </article>
                        `)}
                      `
            }
        </section>
    `;
};

export const renderMyTeams = async () => {
    const rawData = await getAllTeams();

    const data = await Promise.all(
        rawData.map(async (team) => ({
            ...team,
            memberCount: await getMemberCount(team.teamId),
        }))
    );

    render(template(data), rootEl);
};

async function getAllTeams() {
    try {
        const res = await fetch(endpoints.getOwnTeams(localStorage.getItem("userId")));
        return await res.json();
    } catch (error) {
        console.error(error);
    }
}

const getMemberCount = async (teamId) => {
    try {
        const res = await fetch(endpoints.getMembersByTeamId(teamId));
        const data = await res.json();
        return data.length;
    } catch (error) {
        console.error(error);
    }
};

const handleDetailsClick = (e, id) => {
    e.preventDefault();
    page(`/teams/${id}`);
};