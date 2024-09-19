function sumTable() {
    const result = document.getElementById('sum');
    const trs = document.querySelectorAll('tr');

    let sum = 0;
    
    for (let index = 1; index < trs.length - 1; index++) {
        const data = Number(trs[index].querySelectorAll('td')[1].textContent);
        sum += data;
    }

    result.textContent = sum;
}