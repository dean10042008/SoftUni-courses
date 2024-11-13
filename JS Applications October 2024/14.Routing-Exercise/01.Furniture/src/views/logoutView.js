
import { endpoints } from "../../api/endpoints.js";
import { page } from "../../modules/modules.js";

export async function logoutUser() {
    try {
        await fetch(endpoints.logout, {
            method: "GET",
            headers: {
                "X-Authorization": localStorage.getItem("accessToken")
            }
        });

        localStorage.clear();
        page.redirect("/");
    }
    catch (error) {
        alert(error.message);
    }
}