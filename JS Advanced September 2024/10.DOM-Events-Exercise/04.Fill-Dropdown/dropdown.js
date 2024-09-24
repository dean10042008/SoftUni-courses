function addItem() {
    const selectEl = document.getElementById("menu");

    const text = document.getElementById("newItemText").value;
    const value = document.getElementById("newItemValue").value;

    let option = document.createElement("option");
    option.textContent = text;
    option.value = value;

    selectEl.appendChild(option);

    document.getElementById("newItemText").value = "";
    document.getElementById("newItemValue").value = "";
}