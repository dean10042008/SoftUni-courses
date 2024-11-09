const [ inputElTown, loadBtn, rootEl ] = document.querySelectorAll("#towns, #btnLoadTowns, #root");

loadBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let ul = document.createElement("ul");
    rootEl.appendChild(ul);

    if (inputElTown.value === "") return;
    
    const towns = inputElTown.value
        .split(", ")
        .map(town => {
            const li = document.createElement("li");
            li.textContent = town;
            ul.appendChild(li);
        });
});