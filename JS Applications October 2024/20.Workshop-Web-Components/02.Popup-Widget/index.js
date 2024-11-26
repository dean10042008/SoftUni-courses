class CustomPopup extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const styles = `<style>
            .wrapper {
                position: relative;
            }

            .info {
                font-size: 0.8rem;
                width: 200px;
                display: inline-block;
                border: 1px solid black;
                padding: 10px;
                background: white;
                border-radius: 10px;
                opacity: 0;
                transition: 0.6s all;
                position: absolute;
                bottom: 20px;
                left: 10px;
                z-index: 3;
            }

            img {
                width: 1.2rem;
            }

            .icon:hover+.info,
            .icon:focus+.info {
                opacity: 1;
            }
        </style>`;
        
        this.shadow.innerHTML = `
            ${styles}

            <span class="wrapper">
                <span class="icon" tabindex="0">
                    <img src=${this.getAttribute("img-url")} alt=${this.getAttribute("alt-text")}>
                </span>

                <span class="info">
                    ${this.getAttribute("popup-text")}
                </span>
            </span>
        `;
    }
}

customElements.define("custom-popup", CustomPopup);