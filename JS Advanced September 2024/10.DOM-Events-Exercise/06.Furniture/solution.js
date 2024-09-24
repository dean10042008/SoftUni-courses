// 0/100 in judge for some reason. works fine otherwise.
function solve() {
    const [inputEl, resultEl] = document.querySelectorAll('#exercise > textarea');
    const [genarateButton, buyButton] = document.querySelectorAll('#exercise > button');    
    let tbody = document.querySelector("table tbody");

    genarateButton.addEventListener('click', () => {
        const input = JSON.parse(inputEl.value);

        for (const element of input) {
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let image = document.createElement('img');
            image.src = element.img;
            image.alt = "product";
            td1.appendChild(image);

            let td2 = document.createElement('td');
            let pName = document.createElement('p');
            pName.textContent = element.name;
            td2.appendChild(pName);

            let td3 = document.createElement('td');
            let pPrice = document.createElement('p');
            pPrice.textContent = element.price;
            td3.appendChild(pPrice);

            let td4 = document.createElement('td');
            let pDec = document.createElement('p');
            pDec.textContent = element.decFactor;
            td4.appendChild(pDec);

            let td5 = document.createElement('td');
            let inputCheckbox = document.createElement('input');
            inputCheckbox.type = "checkbox";
            td5.appendChild(inputCheckbox);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);

            tbody.appendChild(tr);
        }
    });

    buyButton.addEventListener('click', () => {
        let trs = tbody.querySelectorAll('tr');

        let namesArr = [];
        let totalPrice = 0;
        let decorationFactor = [];

        for (const trEl of trs) {
            let items = trEl.querySelectorAll("td");
            let checkbox = items[items.length - 1].querySelector("input");

            if (checkbox.checked) {
                let name = items[1].querySelector("p").textContent;
                let price = Number(items[2].querySelector("p").textContent);
                let decFactor = Number(items[3].querySelector("p").textContent);

                namesArr.push(name);
                totalPrice += price;
                decorationFactor.push(decFactor);
            }
        }

        let totalDec = 0;

        decorationFactor.forEach(num => totalDec += num);

        resultEl.textContent += `Bought furniture: ${namesArr.join(', ')}\n`;
        resultEl.textContent += `Total price: ${totalPrice.toFixed(2)}\n`;
        resultEl.textContent += `Average decoration factor: ${totalDec / decorationFactor.length}`;
    });
}