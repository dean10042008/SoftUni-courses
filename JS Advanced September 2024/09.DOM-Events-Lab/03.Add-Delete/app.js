function addItem() {
    const ul = document.getElementById("items");
    const newItem = document.getElementById("newItemText").value;
    let li = document.createElement("li");
    li.textContent = newItem;

    let a = document.createElement("a");
    a.textContent = "[Delete]"
    a.href = "#";

    li.appendChild(a);

    a.addEventListener("click", () => {
        li.parentNode.removeChild(li);
    });

    ul.appendChild(li);

    document.getElementById("newItemText").value = "";
}