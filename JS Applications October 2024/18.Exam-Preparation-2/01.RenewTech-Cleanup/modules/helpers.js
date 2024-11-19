const [ errorBox, msgEl ] = document.querySelectorAll("#errorBox, .msg");

export const displayErrorMessage = (text) => {
    msgEl.textContent = text;
    errorBox.style.display = "block";

    setTimeout(() => {
        errorBox.style.display = "none";
        msgEl.textContent = "";
    }, 3000);
}