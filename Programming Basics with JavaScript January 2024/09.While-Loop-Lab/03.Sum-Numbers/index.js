function sumOfNums(input) {
    let targetNum = Number(input[0]);
    let sum = 0;

    let i = 1;
    let currentNum = Number(input[i]);

    while (sum < targetNum) {
        sum += currentNum;
        i++;
        currentNum = Number(input[i]);
    }

    console.log(sum);
}

sumOfNums(["20", "1", "2", "3", "4", "5", "6"]);