function printAndSum(start, end) {
    let sum = 0;
    let count = "";
    for (let i = start; i <= end; i++) {
        count += i + " ";
        sum += i;
    }

    console.log(count)
    console.log(`Sum: ${sum}`);
}

printAndSum(5, 10);