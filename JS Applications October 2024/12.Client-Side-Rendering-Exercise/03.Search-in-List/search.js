import { towns } from "./towns.js";

const [townsEl, searchTextEl, searchBtn, resultEl] = document.querySelectorAll("article > *");

function search() {
    searchBtn.addEventListener("click", () => {
        const searchText = searchTextEl.value;
        if (searchText === "") return;

        let matches = 0;
        let liEls = document.querySelectorAll("ul li");
        
        liEls.forEach(li => {
            if (li.textContent.includes(searchText)) {
                li.classList.add("active");
                matches++;
            }
            else {
                li.classList.remove("active");
            }
        });

        resultEl.textContent = `${matches} matches found`;
    });
}

function loadTowns(towns) {
    let ul = document.createElement("ul");
    
    towns.forEach(town => {
        const li = document.createElement("li");
        li.textContent = town;
        ul.appendChild(li);
    });

    townsEl.appendChild(ul);
}

document.addEventListener("DOMContentLoaded", () => {
    search();
    loadTowns(towns);
});