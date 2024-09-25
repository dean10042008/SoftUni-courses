function solve() {
    const [inputEl, resultEl] = document.querySelectorAll('#exercise > textarea');
    const [generateButton, buyButton] = document.querySelectorAll('#exercise > button');
    let tbody = document.querySelector('table tbody');

    generateButton.addEventListener('click', () => {
        const furnitureArr = JSON.parse(inputEl.value);

        furnitureArr.forEach(furniture => {
            const tr = document.createElement('tr');

            const imgTd = document.createElement('td');
            const img = document.createElement('img');
            img.src = furniture.img;
            imgTd.appendChild(img);
            tr.appendChild(imgTd);

            const nameTd = document.createElement('td');
            const nameP = document.createElement('p');
            nameP.textContent = furniture.name;
            nameTd.appendChild(nameP);
            tr.appendChild(nameTd);

            const priceTd = document.createElement('td');
            const priceP = document.createElement('p');
            priceP.textContent = Number(furniture.price);
            priceTd.appendChild(priceP);
            tr.appendChild(priceTd);

            const decFactorTd = document.createElement('td');
            const decFactorP = document.createElement('p');
            decFactorP.textContent = furniture.decFactor;
            decFactorTd.appendChild(decFactorP);
            tr.appendChild(decFactorTd);

            const markTd = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            markTd.appendChild(checkbox);
            tr.appendChild(markTd);

            tbody.appendChild(tr);
        });
    });

    buyButton.addEventListener('click', () => {
        const rows = Array.from(tbody.querySelectorAll('tr'));
        let boughtItems = [];
        let totalPrice = 0;
        let totalDecorationFactor = 0;

        rows.forEach(row => {
            const checkbox = row.querySelector('input[type="checkbox"]');
            if (checkbox.checked) {
                const name = row.querySelector('td:nth-child(2) p').textContent;
                const price = Number(row.querySelector('td:nth-child(3) p').textContent);
                const decFactor = Number(row.querySelector('td:nth-child(4) p').textContent);

                boughtItems.push(name);
                totalPrice += price;
                totalDecorationFactor += decFactor;
            }
        });

        const avgDecorationFactor = totalDecorationFactor / boughtItems.length;

        resultEl.value = `Bought furniture: ${boughtItems.join(', ')}\n`;
        resultEl.value += `Total price: ${totalPrice.toFixed(2)}\n`;
        resultEl.value += `Average decoration factor: ${avgDecorationFactor}`;
    });
}