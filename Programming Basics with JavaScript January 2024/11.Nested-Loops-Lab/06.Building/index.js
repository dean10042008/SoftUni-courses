function building(input) {
    let floors = Number(input[0]);
    let rooms = Number(input[1]);

    for (let a = floors; a > 0; a--) {
        let currentRow = '';

        for (let b = 0; b < rooms; b++) {
            if (a === floors) {
                currentRow += `L${a}${b} `;
            }
            else if (a % 2 === 0) {
                currentRow += `O${a}${b} `;
            }
            else {
                currentRow += `A${a}${b} `;
            }
        }
        console.log(currentRow);
    }
}

building(["6", "4"]);