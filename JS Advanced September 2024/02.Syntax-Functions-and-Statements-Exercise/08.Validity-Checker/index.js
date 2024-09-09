function validityChecker(x1, y1, x2, y2) {
    function isValid(x1, y1, x2, y2) {
        let result = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

        if (result % 1 === 0) {
            return `{${x1}, ${y1}} to {${x2}, ${y2}} is valid`;
        }
        else {
            return `{${x1}, ${y1}} to {${x2}, ${y2}} is invalid`;
        }
    }

    console.log(isValid(x1, y1, 0, 0));
    console.log(isValid(x2, y2, 0, 0));
    console.log(isValid(x1, y1, x2, y2));
}

validityChecker(3, 0, 0, 4);