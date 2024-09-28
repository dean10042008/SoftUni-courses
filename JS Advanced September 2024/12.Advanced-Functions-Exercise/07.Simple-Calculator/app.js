function calculator() {
    let num1El, num2El, resultEl;

    const obj = {
        init: function (num1Selector, num2Selector, resultSelector) {
            num1El = document.querySelector(num1Selector);
            num2El = document.querySelector(num2Selector);
            resultEl = document.querySelector(resultSelector);
        },
        add: function() {
            resultEl.value = Number(num1El.value) + Number(num2El.value);
        },
        subtract: function() {
            resultEl.value = Number(num1El.value) - Number(num2El.value);
        }
    }

    return obj;
}

const calculate = calculator(); 
calculate.init('#num1', '#num2', '#result'); 