function solve() {
    const inputField = document.getElementById('input');
    const selectMenuTo = document.getElementById('selectMenuTo');
    const resultField = document.getElementById('result');
    const button = document.querySelector('button');

    const binaryOption = document.createElement('option');
    binaryOption.value = 'binary';
    binaryOption.textContent = 'Binary';

    const hexOption = document.createElement('option');
    hexOption.value = 'hexadecimal';
    hexOption.textContent = 'Hexadecimal';

    selectMenuTo.appendChild(binaryOption);
    selectMenuTo.appendChild(hexOption);

    button.addEventListener('click', function() {
        const number = Number(inputField.value);
        const toBase = selectMenuTo.value;

        let result = '';
        if (toBase === 'binary') {
            result = number.toString(2);
        } 
        else if (toBase === 'hexadecimal') {
            result = number.toString(16).toUpperCase();
        }

        resultField.value = result;
    });
}