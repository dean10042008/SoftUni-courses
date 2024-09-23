function addItem() {
    const ul = document.getElementById("items");
    const newItem = document.getElementById("newItemText").value;
    const li = document.createElement("li");
    li.textContent = newItem;

    ul.appendChild(li);

    document.getElementById("newItemText").value = "";
}