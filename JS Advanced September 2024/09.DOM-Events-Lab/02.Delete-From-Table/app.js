function deleteByEmail() {
    const input = document.querySelector("input").value;
    const dataTrEl = document.querySelectorAll('tbody tr');

    let resultEl = document.getElementById("result");

    for (const dataTr of dataTrEl) {
        if (dataTr.querySelector("td:nth-child(2)").textContent === input) {
            dataTr.parentNode.removeChild(dataTr);
            resultEl.textContent = "Deleted.";
            document.querySelector("input").value = "";
            return;
        }
    }

    resultEl.textContent = "Not found.";
    document.querySelector("input").value = "";
}