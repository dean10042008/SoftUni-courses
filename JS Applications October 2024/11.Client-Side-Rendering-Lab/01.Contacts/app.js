import { contacts } from "./contacts.js";
import { render, html } from "./node_modules/lit-html/lit-html.js";

const app = document.getElementById("contacts");

const renderContacts = (contacts) => {

    const toggleDetails = (e) => {
        if (e.target.parentNode.querySelector(".details").style.display === "none" || e.target.parentNode.querySelector(".details").style.display === "") {
            e.target.parentNode.querySelector(".details").style.display = "flex";
        }
        else {
            e.target.parentNode.querySelector(".details").style.display = "none";
        }
    }
    return html`${contacts.map(contact => html`
            <div class="contact card">
                <div>
                    <i class="far fa-user-circle gravatar"></i>
                </div>
                <div class="info">
                    <h2>Name: ${contact.name}</h2>
                    <button class="detailsBtn" @click=${toggleDetails}>Details</button>
                    <div class="details" id="1">
                        <p>Phone number: ${contact.phoneNumber}</p>
                        <p>Email: ${contact.email}</p>
                    </div>
                </div>
            </div>
        `)
        }`;
}

render(renderContacts(contacts), app);