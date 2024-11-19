import { page } from "../../modules/modules.js";
import { endpoints } from "../../api/endpoints.js";
import { displayErrorMessage } from "../../modules/helpers.js";

const rootEl = document.querySelector("#main-element");

export const renderLogout = async () => {
    try {
        const res = await fetch(endpoints.logout, {
            method: "GET",
            headers: {
                "x-Authorization": localStorage.getItem("accessToken")
            }
        });

        if (!res.ok) {
            throw new Error(res.status);
        }

        localStorage.clear();
        page.redirect("/");
    }
    catch (error) {
        console.error("Error:", error);
        // alert(error.message);
        displayErrorMessage(error.message);
    }
}