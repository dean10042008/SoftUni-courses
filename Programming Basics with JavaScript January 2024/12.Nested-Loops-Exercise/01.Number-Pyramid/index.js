function pyramid(input) {
    let number = Number(input[0]);

    let current = 1;
    let isBigger = false;
    let printCurrentLine = '';

    for (let rows = 1; rows <= number; rows++) {
        for (let cols = 1; cols <= rows; cols++) {
            if (current > number) {
                isBigger = true;
                break;
            }
            printCurrentLine += current + " ";
            current++;
        }
        console.log(printCurrentLine);
        printCurrentLine = "";
        if (isBigger) {
            break;
        }
    }
}

pyramid(["7"]);