function notify(message) {
    const resultEl = document.getElementById("notification");
    resultEl.textContent = message;
    resultEl.style.display = "block";

    resultEl.addEventListener("click", () => {
        resultEl.style.display = "none";
    });
}