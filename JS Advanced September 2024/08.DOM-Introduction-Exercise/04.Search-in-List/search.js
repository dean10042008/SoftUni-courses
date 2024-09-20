function search() {
    const liItems = document.querySelectorAll("li");
    const inputData = document.getElementById('searchText').value;
    const resultEl = document.getElementById('result');

    let liText = [];
    let matches = 0;

    for (const liItem of liItems) {
        liText.push(liItem.textContent);
    }

    for (let i = 0; i < liItems.length; i++) {
        liItems[i].style.fontWeight = "normal";
        liItems[i].style.textDecoration = "none";
    }

    for (let i = 0; i < liItems.length; i++) {
        if (liText[i].includes(inputData)) {
            liItems[i].style.fontWeight = "bold";
            liItems[i].style.textDecoration = "underline";
            matches++;
        }
    }

    resultEl.textContent = `${matches} matches found`;
}