function diagonalAttack(arr) {
    let rightSum = 0;
    let leftSum = 0;

    for (let i = 0; i < arr.length; i++) {
        let firstNumsArr = arr[i].split(" ");
        rightSum += Number(firstNumsArr[i]);
    }

    let revIndex = 0;

    for (let j = arr.length - 1; j >= 0; j--) {
        let lastNumsArr = arr[revIndex].split(" ");
        leftSum += Number(lastNumsArr[j]);

        revIndex++;
    }

    if (rightSum === leftSum) {
        let left = 0;
        let right = arr.length - 1;

        for (let arrElement of arr) {
            let splitted = arrElement.split(" ");

            for (let j = 0; j < splitted.length; j++) {
                if (j !== left && j !== right) {
                    splitted[j] = rightSum;
                }
            }

            console.log(splitted.join(" "));

            left++;
            right--;
        }
    }
    else {
        console.log(arr.join("\n"));
    }
}

diagonalAttack(['5 3 12 3 1', '11 4 23 2 5', '101 12 3 21 10', '1 4 5 2 2', '5 22 33 11 1']);