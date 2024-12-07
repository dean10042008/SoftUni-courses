import { endpoints } from "/api/endpoints.js"

export const getTattooData = async (tattooId) => {
    try {
        const res = await fetch(endpoints.details(tattooId));
        const data = await res.json();
        return data;
    }
    catch (err) {
        console.error(err);
    }
}