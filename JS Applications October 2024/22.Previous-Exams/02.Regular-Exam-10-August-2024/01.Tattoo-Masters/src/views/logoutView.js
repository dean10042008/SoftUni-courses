import { page } from "/modules/modules.js";
import { endpoints } from "/api/endpoints.js";

export const logoutUser = async () => {
    try {
        const response = await fetch(endpoints.logout, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("accessToken"),
            }
        });

        if ( ! response.ok) throw new Error("Failed to logout.");

        localStorage.clear();
        page.redirect("/");
    }
    catch (err) {
        alert(err.message);
        console.error(err);
    }
}