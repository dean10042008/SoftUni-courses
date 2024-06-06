function addAndSubtract(num1, num2, num3) {
    function sum(x, y) {
        return x + y;
    }

    function subtract(z, k) {
        return z - k;
    }

    console.log(subtract(sum(num1, num2), num3));
}

addAndSubtract(23, 6, 10);