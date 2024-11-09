let tbody = document.querySelector("tbody");

function solve() {
    document.querySelector('#searchBtn').addEventListener('click', onClick);

    function onClick() {
        const searchEl = document.querySelector("#searchField");

        if (searchEl.value === "") return;

        const searchString = searchEl.value.trim().toLowerCase();
        searchEl.value = '';
        
        const trEls = tbody.querySelectorAll("tr");
        
        for (let tr of trEls) {
            let foundMatch = false;

            for (let td of tr.querySelectorAll("td")) {
                    console.log(foundMatch);
                if ((td.textContent.toLowerCase()).includes(searchString)) {
                    foundMatch = true;
                    break;
                }
            }

            if (foundMatch) {
                tr.classList.add("select");
            }
            else {
                tr.classList.remove("select");
            }
        };
    }
}

async function loadData() {
    const baseUrl = "http://localhost:3030/jsonstore/advanced/table";

    try {
        const response = await fetch(baseUrl);
        const data = Object.values(await response.json());

        data.map(({ firstName, lastName, email, course }) => {
            tbody.appendChild(createRow(firstName, lastName, email, course));
        });
    }
    catch (error) {
        console.error(error);
        alert(error.message);
    }
}

function createRow(firstName, lastName, email, course) {
    let tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${firstName} ${lastName}</td>
        <td>${email}</td>
        <td>${course}</td>
    `;

    return tr;
}

document.addEventListener("DOMContentLoaded", () => {
    solve();
    loadData();
});