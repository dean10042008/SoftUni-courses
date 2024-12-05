import { endpoints } from "../../api/endpoints.js";
import { page } from "../../modules/modules.js";

export const logoutUser = async () => {
    try {
        const res = await fetch(endpoints.logout, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("accessToken")
            },
        });

        if ( ! res.ok) throw new Error("Error logging out");

        page.redirect("/");
        localStorage.clear();
    }
    catch(error) {
        console.error(error);
    }
}