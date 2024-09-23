function focused() {
    const inputs = document.querySelectorAll("div input");

    for (const inputEl of inputs) {
        inputEl.addEventListener("focus", () => {
            inputEl.parentNode.classList.add("focused");
        });
        inputEl.addEventListener("blur", () => {
            inputEl.parentNode.classList.remove("focused");
        });
    }
}