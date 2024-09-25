function solve() {
    let [quickCheckButton, clearButton] = document.querySelectorAll("tfoot tr td button");
    let resultEl = document.querySelector("#check p");
    let table = document.querySelector("table");

    let trs = document.querySelectorAll("tbody tr");
    
    quickCheckButton.addEventListener("click", () => {
        let result = [];
        for (const tr of trs) {
            let currentData = [];

            for (const tdInput of tr.querySelectorAll("td input")) {
                currentData.push(tdInput.value);
            }

            result.push(currentData);
        }

        let isFine = true;

        for (let i = 0; i < result.length; i++) {
            let row = result[i];
            let currentRowData = [];
            let currentColumnData = [];

            for (let j = 0; j < row.length; j++) {
                if (currentRowData.includes(row[j])) {
                    isFine = false;
                    break;
                }
                else {
                    currentRowData.push(row[j]);
                }

                if (currentColumnData.includes(result[j][i])) {
                    isFine = false;
                    break;
                }
                else {
                    currentColumnData.push(result[j][i]);
                }
            }
        }

        if (isFine) {
            table.style.border = '2px solid green';
            resultEl.textContent = "You solve it! Congratulations!";
            resultEl.style.color = 'green';
        }
        else {
            table.style.border = '2px solid red';
            resultEl.textContent = "NOP! You are not done yet...";
            resultEl.style.color = 'red';
        }
    });

    clearButton.addEventListener("click", () => {
        table.style.border = "none";
        resultEl.textContent = "";

        for (const tr of trs) {
            for (const tdInput of tr.querySelectorAll("td input")) {
                tdInput.value = "";
            }
        }
    });
}