function attachGradientEvents() {
    const gradientBox = document.getElementById("gradient-box");
    let resultEl = document.getElementById("result");

    gradientBox.addEventListener("mousemove", (e) => {
        const xOffset = e.offsetX;
        const boxWidth = e.target.clientWidth - 1;
        resultEl.textContent = `${Math.trunc((xOffset / boxWidth) * 100)}%`;
    });

    gradientBox.addEventListener("mouseout", () => {
        resultEl.textContent = "";
    });
}