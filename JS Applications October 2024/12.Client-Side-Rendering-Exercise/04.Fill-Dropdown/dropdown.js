const [ menuSelectEl, itemText, submitEl ] = document.querySelectorAll("#menu, form input");
const baseUrl = "http://localhost:3030/jsonstore/advanced/dropdown";

submitEl.addEventListener("click", addItem);

async function addItem(e) {
    e.preventDefault();
    
    if (itemText.value === "") return;

    const item = { text: itemText.value };
    
    try {
        const res = await fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        });

        const data = await res.json();
        
        menuSelectEl.appendChild(createOption(data.text, data._id));
    }
    catch(err) {
        console.error(err);
    }
}

async function getItems() {
    try {
        const res = await fetch(baseUrl);
        const data = Object.values(await res.json());
        
        data.map(({ text, _id }) => {
            menuSelectEl.appendChild(createOption(text, _id));
        });
    }
    catch (err) {
        console.error(err);
    }
}

function createOption(text, id) {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = text;
    
    return option;
}

document.addEventListener("DOMContentLoaded", () => {
    getItems();
});