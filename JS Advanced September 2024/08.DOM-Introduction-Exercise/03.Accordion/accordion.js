function toggle() {
    const extraText = document.getElementById("extra");
    const button = document.querySelector("span");

    if (extraText.style.display == "none") {
        extraText.style.display = "block";
        button.textContent = "Less";
    }
    else {
        extraText.style.display = "none";
        button.textContent = "More";
    }
}