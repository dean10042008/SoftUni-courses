import { endpoints } from "../api/endpoints.js";

export async function getShowDetails(showId) {
    try {
        const res = await fetch(endpoints.details(showId));

        if ( ! res.ok) {
            throw new Error("Couldn't get details");
        }

        const data = res.json();
        return data;
    }
    catch(err) {
        console.error(err);
    }
}