function solve() {
    const button = document.querySelector("button");

    const [nameEl, hallEl, priceEl] = document.querySelectorAll("input[type='text']");
    const ulCurrent = document.querySelector('#movies ul');
    const ulArchive = document.querySelector('#archive ul');
    
    button.addEventListener("click", (e) => {
        e.preventDefault();
        
        if (nameEl.value === "" || hallEl.value === "" || priceEl.value === "") return;

        if (isNaN(Number(priceEl.value))) {
            return;
        }

        createListItem(nameEl.value, hallEl.value, priceEl.value);

        nameEl.value = '';
        hallEl.value = '';
        priceEl.value = '';
    });

    function createListItem(name, hall, price) {
        const li = document.createElement('li');

        const spanEl = document.createElement('span');
        spanEl.textContent = name;

        const strongHallEl = document.createElement('strong');
        strongHallEl.textContent = `Hall: ${hall}`;

        const restDiv = document.createElement('div');

        const priceStrongEl = document.createElement('strong');
        priceStrongEl.textContent = Number(price).toFixed(2);

        const inputEl = document.createElement('input');
        inputEl.placeholder = "Tickets Sold";

        const btnArchive = document.createElement('button');
        btnArchive.textContent = "Archive";

        btnArchive.addEventListener('click', () => archiveMovie(btnArchive));

        restDiv.append(priceStrongEl, inputEl, btnArchive);

        li.append(spanEl, strongHallEl, restDiv);
        ulCurrent.append(li);
    }

    function archiveMovie(btn) {
        let parent = btn.closest("li");
        
        let name = parent.querySelector("span").textContent.trim();
        let ticketPrice = parent.querySelector("div strong").textContent.trim();
        let ticketCount = parent.querySelector("input").value;

        if (!isNaN(Number(ticketCount)) && ticketCount !== "") {
            const total = Number(ticketCount) * Number(ticketPrice);
            createArchiveMovie(name, total);
            parent.remove();
        }
    }

    function createArchiveMovie(name, price) {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = name;

        const strong = document.createElement('strong');
        strong.textContent = `Total amount: ${price.toFixed(2)}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener('click', () => deleteArchiveMovie(li))

        li.append(span, strong, deleteBtn);
        ulArchive.appendChild(li);
    }

    function deleteArchiveMovie(li) {
        li.remove();
    }

    const clearButton = document.querySelector("#archive > button");
    clearButton.addEventListener("click", () => {
        const lis = Array.from(ulArchive.children);

        for (const li of lis) {
            deleteArchiveMovie(li);
        }
    });
}