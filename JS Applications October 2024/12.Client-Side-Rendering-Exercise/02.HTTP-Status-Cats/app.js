import { cats } from "./catSeeder.js";
import { html, render } from "./node_modules/lit-html/lit-html.js";

document.addEventListener("DOMContentLoaded", function() {
    const allCats = document.querySelector("#allCats");

    render(renderCats(), allCats);

    function renderCats() {
        return html`
            <ul>
                ${
                    cats.map(cat => {
                        function toggleView(e) {
                            const statusDiv = document.getElementById(cat.id);

                            if (statusDiv.style.display === "none") {
                                statusDiv.style.display = "block";
                                e.target.textContent = "Hide status code";
                            }
                            else {
                                statusDiv.style.display = "none";
                                e.target.textContent = "Show status code";
                            }
                        }

                        return html`
                            <li>
                                <img src="./images/cat${cat.statusCode}.jpg" width="250" height="250" alt="Card image cap">
                                <div class="info">
                                    <button class="showBtn" @click=${toggleView} >Show status code</button>
                                    <div class="status" style="display: none" id=${cat.id}>
                                        <h4>Status Code: ${cat.statusCode}</h4>
                                        <p>${cat.statusMessage}</p>
                                    </div>
                                </div>
                            </li>
                        `;
                })}
            </ul>
        `;
    }
});