window.addEventListener('load', fitnessJourney);

function fitnessJourney() {
    const nextBtn = document.getElementById("next-btn");
    nextBtn.addEventListener("click", readInput);

    const nameEl = document.querySelector("#name");
    const emailEl = document.querySelector("#email");
    const contactNumberEl = document.querySelector("#contact-number");
    const classTypeEl = document.querySelector("#class-type");
    const classTimeEl = document.querySelector("#class-time");
    
    const preview = document.querySelector(".class-info");
    const confirmPanel = document.querySelector(".confirm-class");

    let name;
    let email;
    let contact;
    let classType;
    let time;

    function readInput(e) {
        e.preventDefault();

        name = nameEl.value;
        email = emailEl.value;
        contact = contactNumberEl.value;
        classType = classTypeEl.value;
        time = classTimeEl.value;

        if (name === "" || email === "" || contact === "" || classType === "" || time === "") {
            return;
        }

        nextBtn.disabled = true;

        nameEl.value = "";
        emailEl.value = "";
        contactNumberEl.value = "";
        classTypeEl.value = "";
        classTimeEl.value = "";

        createPreview(name, email, contact, classType, time);
    }
    
    function createPreview(name, email, contact, classType, time) {
        const element = document.createElement("li");
        element.className = "info-item";

        const article = document.createElement("article");
        article.className = "personal-info";

        article.appendChild(createPara(name));
        article.appendChild(createPara(email));
        article.appendChild(createPara(contact));
        article.appendChild(createPara(classType));
        article.appendChild(createPara(time));
        element.appendChild(article);

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.addEventListener("click", edit);

        const continueBtn = document.createElement("button");
        continueBtn.textContent = "Continue";
        continueBtn.className = "continue-btn";
        continueBtn.addEventListener("click", continueWithPreview);

        element.appendChild(editBtn);
        element.appendChild(continueBtn);

        preview.appendChild(element);
    }

    function edit() {
        nextBtn.disabled = false;
        nameEl.value = name;
        emailEl.value = email;
        contactNumberEl.value = contact;
        classTypeEl.value = classType;
        classTimeEl.value = time;

        preview.innerHTML = "";
    }

    function continueWithPreview() {
        const el = document.querySelector("li");
        el.className = "continue-info";
        confirmPanel.appendChild(el);

        el.querySelector(".edit-btn").remove();
        el.querySelector(".continue-btn").remove();

        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.className = "cancel-btn";
        cancelBtn.addEventListener("click", cancel);

        const confirmBtn = document.createElement("button");
        confirmBtn.textContent = "Confirm";
        confirmBtn.className = "confirm-btn";
        confirmBtn.addEventListener("click", confirmAction);

        el.appendChild(cancelBtn)
        el.appendChild(confirmBtn);
    }

    function cancel() {
        nextBtn.disabled = false;
        confirmPanel.innerHTML = "";
    }

    function confirmAction() {
        document.getElementById("main").remove();

        const thankYou = document.createElement("h1");
        thankYou.id = "thank-you";
        thankYou.textContent = "Thank you for scheduling your appointment, we look forward to seeing you!";

        const doneBtn = document.createElement("button");
        doneBtn.id = "done-btn";
        doneBtn.textContent = "Done";
        doneBtn.addEventListener("click", () => {
            window.location = window.location;
        });

        document.body.appendChild(thankYou);
        document.body.appendChild(doneBtn);
    }

    function createPara(content) {
        const p = document.createElement("p");
        p.textContent = content;
        return p;
    }
}