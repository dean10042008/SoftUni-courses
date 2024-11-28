class CustomSlider extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const styles = `<style>
            .slider-container {
                font-family: 'Montserrat', sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                height: 100px;
            }

            .slider-percentage-value {
                font-weight: bold;
                text-align: center;
                margin: 1em 0;
            }

            .slider {
                -webkit-appearance: none;
                width: 100%;
                height: 15px;
                border-radius: 5px;
                background: #d3d3d3;
                outline: none;
                opacity: 0.7;
                -webkit-transition: .2s;
                transition: opacity .2s;
                margin: 0 1em;
            }

            .slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 25px;
                height: 25px;
                border-radius: 50%;
                background: #4CAF50;
                cursor: pointer;
            }

            .slider::-moz-range-thumb {
                width: 25px;
                height: 25px;
                border-radius: 50%;
                background: #4CAF50;
                cursor: pointer;
            }
        </style>`;

        const shouldBeInverted = JSON.parse(this.getAttribute("inverted"));

        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'slider-container';

        const sliderInput = document.createElement('input');
        sliderInput.type = "range";
        sliderInput.className = "slider";
        sliderInput.value = this.getAttribute("initial");
        sliderInput.step = this.getAttribute("step");

        sliderInput.addEventListener("change", () => {
            sliderPercentage.textContent = shouldBeInverted ? `${(100 - sliderInput.value).toFixed(2)} %` : `${Number(sliderInput.value).toFixed(2)} %`;
        });

        sliderContainer.appendChild(sliderInput);

        const sliderEnd = document.createElement("div");
        sliderEnd.className = "slider-end";
        sliderEnd.textContent = "Percentage: ";

        const sliderPercentage = document.createElement("span");
        sliderPercentage.className = "slider-percentage-value";
        sliderPercentage.textContent = shouldBeInverted ? `${(100 - this.getAttribute("initial")).toFixed(2)} %` : `${Number(this.getAttribute("initial")).toFixed(2)} %`;

        sliderEnd.appendChild(sliderPercentage);

        sliderContainer.appendChild(sliderEnd);

        this.shadow.innerHTML = styles;
        this.shadow.appendChild(sliderContainer);
    }
}

customElements.define("custom-slider", CustomSlider);