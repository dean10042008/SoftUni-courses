import { endpoints } from "../../api/endpoints.js";
import { acceptTeamMember, requestTeamMember } from "../../modules/helpers.js";
import { html, page, render } from "../../modules/modules.js";

const rootEl = document.getElementById("root");

const template = (teamData, membersData) => {
    const hasAccessToken = localStorage.getItem("accessToken") !== null;
    
    let isUserMember = false;
    let isUserPending = false;
    const isOwner = teamData._ownerId === localStorage.getItem("userId");

    for (const member of membersData) {
        if (member.user._id === localStorage.getItem("userId") && member.status === "member") {
            isUserMember = true;
            break;
        }

        if (member.user._id === localStorage.getItem("userId") && member.status === "pending") {
            isUserPending = true;
            break;
        }
    }

    return html`
        <section id="team-home">
            <article class="layout">
                <img src=${teamData.logoUrl} class="team-logo left-col">
                <div class="tm-preview">
                    <h2>${teamData.name}</h2>
                    <p>${teamData.description}</p>
                    <span class="details">${(membersData.filter(member => member.status === "member")).length} Members</span>
                    <div>

                        ${
                            isOwner ? html`<a @click=${(e) => handleEditClick(e, teamData._id)} class="action">Edit team</a>` : ""
                        }
                        
                        ${
                            hasAccessToken && !isUserMember && !isUserPending ? html`<a @click=${() => requestTeamMember(teamData._id)} href="#" class="action">Join team</a>` : ""
                        }

                        ${
                            isUserMember && !isOwner ? html`<a @click=${(e) => deleteUser(e, membersData.find(member => member._ownerId === localStorage.getItem("userId"))._id)} class="action invert">Leave team</a>` : ""
                        }

                        ${
                            isUserPending ?
                            html`
                                <span>Membership pending.</span>
                                <a @click=${(e) => deleteUser(e, membersData.find(member => member._ownerId === localStorage.getItem("userId"))._id)} href="#">Cancel request</a>
                            ` : ""
                        }
                    </div>
                </div>

                <div class="pad-large">
                    <h3>Members</h3>
                    <ul class="tm-members">
                        ${
                            membersData.map(member => {
                                if (member.status === 'member') {
                                    return html`
                                        <li>${member.user.username}${isOwner && member.user._id !== localStorage.getItem("userId") ? html`<a @click=${(e) => deleteUser(e, member._id)} href="#" class="tm-control action">Remove from team</a>` : ""}</li>
                                    `;
                                }
                            })
                        }
                    </ul>
                </div>

                ${
                    isOwner ?
                    html`
                    ${
                        (membersData.filter(member => member.status === "pending")).length > 0 ? html`
                            <div class="pad-large">
                                <h3>Membership Requests</h3>
                                <ul class="tm-members">
                                    ${
                                        membersData.map(member => {
                                            if (member.status === 'pending') {
                                                return html`
                                                    <li>${member.user.username}<a @click=${(e) => acceptUser(e, member)} href="#" class="tm-control action">Approve</a><a @click=${(e) => deleteUser(e, member._id)} href="#" class="tm-control action">Decline</a></li>
                                                `;
                                            }
                                        })
                                    }
                                </ul>
                            </div>
                        ` :
                        html`
                            <div class="pad-large">
                                <h3>Membership Requests</h3>
                                <p>No pending membership requests.</p>
                            </div>
                        `
                    }   
                    `
                    : ""
                }
            </article>
        </section>
    `;
}

export const renderDetails = async (ctx) => {
    const id = ctx.params.teamId;

    const teamData = await getTeamDetails(id);
    const membersData = await getMemberDetails(id);

    render(template(teamData, membersData), rootEl);
}

const getTeamDetails = async (id) => {
    try {
        const res = await fetch(endpoints.getDetails(id));
        const data = await res.json();
        return data;
    }
    catch(error) {
        console.error(error);
    }
}

const getMemberDetails = async (id) => {
    try {
        const res = await fetch(endpoints.getMembersDetails(id));
        const data = await res.json();
        return data;
    }
    catch(error) {
        console.error(error);
    }
}

const deleteUser = async (e, id) => {
    e.preventDefault();

    try {
        const res = await fetch(endpoints.deleteMemberFromTeam(id), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("accessToken"),
            },
        });

        if (res.ok) {
            page();
        }
    }
    catch (error) {
        console.error(error);
    }
}

const acceptUser = async (e, userData) => {
    e.preventDefault();

    const newUserData = Object.assign({}, userData);
    newUserData.status = "member";
    await acceptTeamMember(newUserData, newUserData._id);
    page();
}

const handleEditClick = async (e, id) => {
    e.preventDefault();

    page(`/teams/edit/${id}`);
}