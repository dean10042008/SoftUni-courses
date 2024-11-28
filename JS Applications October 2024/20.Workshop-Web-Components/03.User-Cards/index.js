class CustomCard extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const styles = `<style>
            .user-card {
                display: flex;
                font-family: 'Arial', sans-serif;
                background-color: #EEE;
                border-bottom: 5px solid darkorchid;
                width: 100%;
            }

            .user-card img {
                width: 200px;
                height: 200px;
                border: 1px solid darkorchid;
            }

            .info {
                display: flex;
                flex-direction: column;
            }

            .info h3 {
                font-weight: bold;
                margin-top: 1em;
                text-align: center;
            }

            .info button {
                outline: none;
                border: none;
                cursor: pointer;
                background-color: darkorchid;
                color: white;
                padding: 0.5em 1em;
            }

            @media only screen and (max-width: 500px) {
                .user-card {
                    flex-direction: column;
                    margin-bottom: 1em;
                }

                .user-card figure,
                .info button {
                    align-self: center;
                }

                .info button {
                    margin-bottom: 1em;
                }

                .info p {
                    padding-left: 1em;
                }
            }
        </style>`;
        
        const userCardDiv = document.createElement('div');
        userCardDiv.className = 'user-card';

        const figureEl = document.createElement('figure');

        const imgEl = document.createElement('img');
        imgEl.src = this.getAttribute("imageUrl");

        figureEl.appendChild(imgEl);
        userCardDiv.appendChild(figureEl);

        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';

        const h3 = document.createElement('h3');
        h3.textContent = this.getAttribute("username");

        infoDiv.appendChild(h3);

        const randomDiv = document.createElement('div');
        randomDiv.style.display = 'none';

        const emailP = document.createElement('p');

        const emailSlot = document.createElement('slot');
        emailSlot.name = 'email';

        emailP.appendChild(emailSlot);
        randomDiv.appendChild(emailP);

        const phoneP = document.createElement('p');

        const phoneSlot = document.createElement('slot');
        phoneSlot.name = 'phone';

        phoneP.appendChild(phoneSlot);
        randomDiv.appendChild(phoneP);

        infoDiv.appendChild(randomDiv);

        const detailsInfo = document.createElement("button");
        detailsInfo.className = "toggle-info-btn";
        detailsInfo.textContent = "Toggle Info";

        detailsInfo.addEventListener("click", (e) => {
            if (e.target.textContent === "Toggle Info") {
                e.target.textContent = "Hide Info";
                randomDiv.style.display = "block";
            }
            else {
                e.target.textContent = "Toggle Info";
                randomDiv.style.display = "none";
            }
        });

        infoDiv.appendChild(detailsInfo);

        userCardDiv.appendChild(infoDiv);

        this.shadow.innerHTML = styles;
        this.shadow.appendChild(userCardDiv);
    }
}

customElements.define("custom-card", CustomCard);