function attachEventsListeners() {
    const conversionRatesToMeters = {
        km: 1000,
        m: 1,
        cm: 0.01,
        mm: 0.001,
        mi: 1609.34,
        yrd: 0.9144,
        ft: 0.3048,
        in: 0.0254
    };

    const [inputSelectEl, resultSelectEl] = document.querySelectorAll("select");
    const [inputTextEl, resultTextEl] = document.querySelectorAll("input[type=text]");
    const buttonEl = document.querySelector("input[type=button]");

    buttonEl.addEventListener("click", () => {
        const distance = Number(inputTextEl.value);
        let typeInput = inputSelectEl.value;
        const typeResult = resultSelectEl.value;

        let resultInMeters = conversionRatesToMeters[typeInput] * distance;

        let result = resultInMeters / conversionRatesToMeters[typeResult];

        resultTextEl.value = result;
    });
}