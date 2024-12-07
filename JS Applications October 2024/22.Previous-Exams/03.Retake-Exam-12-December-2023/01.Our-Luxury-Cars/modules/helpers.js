import { endpoints } from "../api/endpoints.js";

export async function getDetails(itemId) {
    try {
        const res = await fetch(endpoints.details(itemId));

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