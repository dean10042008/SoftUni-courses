function validate() {
    const emailEl = document.getElementById("email");

    emailEl.addEventListener("change", () => {
        const email = emailEl.value;
    
        const regex = /([a-z]+)@{1}([a-z]+).{1}([a-z]+)/;

        if (regex.test(email)) {
            emailEl.classList.remove("error");
        }
        else {
            emailEl.classList.add("error");
        }
    });
}