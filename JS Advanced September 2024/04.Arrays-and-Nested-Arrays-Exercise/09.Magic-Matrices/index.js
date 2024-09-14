function magicMatrices(matrix) {
        let colSum = 0;
        let oldColSum = 0;

        matrix.forEach((element) => {
            oldColSum += element[0];
        })

        for (let i = 0; i < matrix.length; i++) {
            colSum = 0;

            for (let j = 0; j < matrix.length; j++) {
                colSum += matrix[j][i];
            }

            if (!(colSum === oldColSum)) {
                console.log(false);
                return;
            }
        }

        let rowSum = 0;

        for (const row of matrix) {
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