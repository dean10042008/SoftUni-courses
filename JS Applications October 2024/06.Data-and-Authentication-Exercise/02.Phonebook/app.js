function attachEvents() {
    const url = "http://localhost:3030/jsonstore/phonebook";
    let ids = {};

    const [phonebookListEl, loadBtn, personInputEl, phoneInputEl, createBtn] = ["#phonebook", "#btnLoad", "#person", "#phone", "#btnCreate"].map(sel => document.querySelector(sel));

    loadBtn.addEventListener("click", async () => {
        const res = await fetch(url);
        const data = Object.values(await res.json());

        data.map(({ person, phone, _id }) => {
            ids[`${person}: ${phone}`] = _id;
            const li = createListItem(person, phone);
            phonebookListEl.appendChild(li);
        });
    });

    createBtn.addEventListener("click", async () => {
        const person = personInputEl.value;
        const phone = phoneInputEl.value;

        if (person === "" || phone === "") return;
        
        personInputEl.value = "";
        phoneInputEl.value = "";

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ person, phone })
        });
    });

    function createListItem(person, phone) {
        const li = document.createElement("li");
        li.textContent = `${person}: ${phone}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", async () => {
            const res = await fetch(`${url}/${ids[`${person}: ${phone}`]}`, {
                method: "DELETE"
            });
        });

        li.appendChild(deleteBtn);
        return li;
    }
}

attachEvents();