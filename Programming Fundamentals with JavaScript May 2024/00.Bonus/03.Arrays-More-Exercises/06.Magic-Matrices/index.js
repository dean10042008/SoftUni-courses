function magicMatrices(arr) {
    let colSum = 0;
    let oldColSum = 0;

    arr.forEach((element) => {
        oldColSum += element[0];
    })

    for (let i = 0; i < arr.length; i++) {
        colSum = 0;

        for (let j = 0; j < arr.length; j++) {
            colSum += arr[j][i];
        }

        if (!(colSum === oldColSum)) {
            console.log(false);
            return;
        }
    }

    let rowSum = 0;

    for (const row of arr) {
        rowSum = 0;

        for (const rowElement of row) {
            rowSum += rowElement;
        }

        if (!(rowSum === oldColSum)) {
            console.log(false);
            return;
        }
    }

    console.log(true);
}

magicMatrices([[4, 5, 6], [6, 5, 4], [5, 5, 5]]);