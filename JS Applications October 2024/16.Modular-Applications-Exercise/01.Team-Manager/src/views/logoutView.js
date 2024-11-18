import { endpoints } from "../../api/endpoints.js";
import { page } from "../../modules/modules.js";

export const logoutUser = async () => {
    try {
        const res = await fetch(endpoints.logout, {
            method: "GET",
            headers: {
                "X-Authorization": localStorage.getItem("accessToken"),
            },
        });

        if (res.ok) {
            localStorage.clear();
            page.redirect("/");
        }
    }
    catch (error) {
        console.error(error);
        alert(error.message);
    } 
}