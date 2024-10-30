function attachEvents() {
    const url = "http://localhost:3030/jsonstore/collections/students";

    const form = document.getElementById("form");
    const tbody = document.querySelector("tbody");

    document.addEventListener("DOMContentLoaded", async () => {
        const res = await fetch(url);
        const data = Object.values(await res.json());

        data.forEach(({ firstName, lastName, facultyNumber, grade, _id }) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${facultyNumber}</td>
                <td>${grade}</td>
            `;

            tbody.appendChild(row);
        });
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const { firstName, lastName, facultyNumber, grade } = Object.fromEntries(new FormData(e.currentTarget));

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ firstName, lastName, facultyNumber, grade })
        });
    });

}

attachEvents();