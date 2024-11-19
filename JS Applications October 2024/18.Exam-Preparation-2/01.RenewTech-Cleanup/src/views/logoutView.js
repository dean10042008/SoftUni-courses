import { page } from "../../modules/modules.js"
import { endpoints } from "../../api/endpoints.js";

export const logoutUser = async () => {
    try {
        const res = await fetch(endpoints.logout, {
            method: "GET",
            headers: {
                "X-Authorization": localStorage.getItem("accessToken"),
            },
        });

        if (!res.ok) {
            throw new Error("Failed to logout.");
        }

        localStorage.clear();
        page.redirect("/");
    }
    catch(error) {
        console.error(error);
        alert(error.message);
    }
}