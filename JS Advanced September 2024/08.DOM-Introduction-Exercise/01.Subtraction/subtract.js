function subtract() {
    const resultEl = document.getElementById('result');

    const first = Number(document.getElementById('firstNumber').value);
    const second = Number(document.getElementById('secondNumber').value);

    const result = first - second;

    resultEl.textContent = result;
}