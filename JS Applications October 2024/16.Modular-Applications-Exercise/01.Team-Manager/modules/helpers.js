import { endpoints } from "../api/endpoints.js";

export const requestTeamMember = async (teamId) => {
    try {
        const res = await fetch(endpoints.requestMember, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("accessToken"),
            },
            body: JSON.stringify({ teamId: teamId })
        });
        
        const data = await res.json();
        return data;
    }
    catch (error) {
        throw new Error("Failed to add member to team.")
    }
}

export const acceptTeamMember = async (newData, userId) => {
    try {
        await fetch(endpoints.addMemberToTeam(userId), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("accessToken"),
            },
            body: JSON.stringify(newData),
        });
    }
    catch (error) {
        throw new Error("Failed to accept member.")
    }
}