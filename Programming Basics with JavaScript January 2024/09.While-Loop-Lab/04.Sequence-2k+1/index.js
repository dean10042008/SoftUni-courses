function sequence(input) {
    let incomeNum = Number(input[0]);

    let count = 1;

    while (count <= incomeNum) {
        console.log(count);
        count = (count * 2) + 1;
    }
}

sequence(["8"]);