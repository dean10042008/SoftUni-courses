function attachEvents() {
    const url = "http://localhost:3030/jsonstore/collections/books";

    const loadBooksBtn = document.querySelector("#loadBooks");
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    const form = document.querySelector("form");
    const [titleEl, authorEl] = form.querySelectorAll("input");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (titleEl.value === "" || authorEl.value === "") return;

        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ author: authorEl.value, title: titleEl.value })
        });
        form.reset();
    });

    loadBooksBtn.addEventListener("click", async () => {
        const res = await fetch(url);
        const data = await res.json();

        const indexes = Object.keys(data);
        const dataAsArray = Object.values(data);

        dataAsArray.map(({ author, title }, i) => {
            const tr = createTableRow(author, title, indexes[i]);

            tbody.appendChild(tr);
        });
    });

    function createTableRow(author, title, id) {
        const tr = document.createElement("tr");

        const titleTd = document.createElement("td");
        titleTd.textContent = title;

        const authorTd = document.createElement("td");
        authorTd.textContent = author;

        const actionsTd = document.createElement("td");

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", async () => {
            fetch(`${url}/${id}`, {
                method: "DELETE"
            });
        });

        editBtn.addEventListener("click", async () => {
            authorEl.value = author;
            titleEl.value = title;

            document.querySelector("form > h3").textContent = "Edit FORM";
            document.querySelector("form > button").textContent = "Save";

            document.querySelector("form > button").addEventListener("click", async () => {
                fetch(`${url}/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ author: authorEl.value, title: titleEl.value })
                });
            });
        });

        actionsTd.appendChild(editBtn);
        actionsTd.appendChild(deleteBtn);

        tr.appendChild(titleTd);
        tr.appendChild(authorTd);
        tr.appendChild(actionsTd);

        return tr;
    }
}

attachEvents();