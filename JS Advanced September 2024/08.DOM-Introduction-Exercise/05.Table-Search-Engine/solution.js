function solve() {
    document.querySelector("#searchBtn").addEventListener("click", onClick);

    function onClick() {
        const searchEl = document.getElementById("searchField").value;

        const trs = document.querySelectorAll("tbody tr");

        for (const tr of trs) {
            const tds = tr.querySelectorAll("td");

            for (const td of tds) { 
                if (td.textContent.includes(searchEl)) {
                    tr.classList.add("select");
                    break;
                }
                else {
                    tr.classList.remove("select");
                }
            }
        }

        document.getElementById("searchField").value = "";
    }
}