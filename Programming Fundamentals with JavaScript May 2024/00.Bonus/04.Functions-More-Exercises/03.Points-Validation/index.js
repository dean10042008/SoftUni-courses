function pointsValidation(arr) {
    function validate(x1, y1, x2, y2) {
        let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

        if (distance % 1 === 0) {
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is valid`);
        }
        else {
            console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`);
        }
    }

    const [x1, y1, x2, y2] = arr;

    validate(x1, y1, 0, 0);
    validate(x2, y2, 0, 0);
    validate(x1, y1, x2, y2);
}

pointsValidation([3, 0, 0, 4]);