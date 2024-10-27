async function lockedProfile() {
    const mainEl = document.querySelector("main");
    mainEl.textContent = "";

    const res = await fetch("http://localhost:3030/jsonstore/advanced/profiles");
    const profiles = await res.json();

    for (let i = 0; i < Object.values(profiles).length; i++) {
        const element = Object.values(profiles)[i];
        const profileEl = createProfile(element.username, element.email, element.age, i + 1);

        mainEl.appendChild(profileEl);
    }

    function createProfile(username, email, age, index) {
        const profileDiv = document.createElement("div");
        profileDiv.classList.add("profile");

        const img = document.createElement("img");
        img.src = "./iconProfile2.png";
        img.classList.add("userIcon");

        const labelLock = document.createElement("label");
        labelLock.textContent = "Lock";

        const lockInputEl = document.createElement("input");
        lockInputEl.type = "radio";
        lockInputEl.name = `user${index}Locked`;
        lockInputEl.value = "lock";
        lockInputEl.setAttribute("checked", true);

        const labelUnlock = document.createElement("label");
        labelUnlock.textContent = "Unlock";

        const unlockInputEl = document.createElement("input");
        unlockInputEl.type = "radio";
        unlockInputEl.name = `user${index}Locked`;
        unlockInputEl.value = "unlock";

        const br = document.createElement("br");

        const hr = document.createElement("hr");

        const labelUsername = document.createElement("label");
        labelUsername.textContent = "Username";

        const usernameInputEl = document.createElement("input");
        usernameInputEl.type = "text";
        usernameInputEl.name = `user${index}Username`;
        usernameInputEl.value = username;
        usernameInputEl.disabled = true;
        usernameInputEl.setAttribute("readonly", true);

        const additionalInfoDiv = document.createElement("div");
        additionalInfoDiv.id = `user${index}HiddenFields`;
        additionalInfoDiv.style.display = "none";

        const labelEmail = document.createElement("label");
        labelEmail.textContent = "Email:";
        
        const emailInputEl = document.createElement("input");
        emailInputEl.type = "email";
        emailInputEl.name = `user${index}Email`;
        emailInputEl.value = email;
        emailInputEl.disabled = true;
        emailInputEl.setAttribute("readonly", true);

        const labelAge = document.createElement("label");
        labelAge.textContent = "Age:";

        const ageInputEl = document.createElement("input");
        ageInputEl.type = "number";
        ageInputEl.name = `user${index}Age`;
        ageInputEl.value = age;
        ageInputEl.disabled = true;
        ageInputEl.setAttribute("readonly", true);

        additionalInfoDiv.appendChild(hr);
        additionalInfoDiv.appendChild(labelEmail);
        additionalInfoDiv.appendChild(emailInputEl);
        additionalInfoDiv.appendChild(labelAge);
        additionalInfoDiv.appendChild(ageInputEl);

        const showMoreBtn = document.createElement("button");
        showMoreBtn.textContent = "Show more";

        showMoreBtn.addEventListener("click", () => {
            if (additionalInfoDiv.style.display === "none" && unlockInputEl.checked === true) {
                additionalInfoDiv.style.display = "block";
            }
            else if (additionalInfoDiv.style.display === "block" && unlockInputEl.checked === true) {
                additionalInfoDiv.style.display = "none";
            }
        });

        profileDiv.appendChild(img);
        profileDiv.appendChild(labelLock);
        profileDiv.appendChild(lockInputEl);
        profileDiv.appendChild(labelUnlock);
        profileDiv.appendChild(unlockInputEl);
        profileDiv.appendChild(br);
        profileDiv.appendChild(hr);
        profileDiv.appendChild(labelUsername);
        profileDiv.appendChild(usernameInputEl);
        profileDiv.appendChild(additionalInfoDiv);
        profileDiv.appendChild(showMoreBtn);

        return profileDiv;
    }
}