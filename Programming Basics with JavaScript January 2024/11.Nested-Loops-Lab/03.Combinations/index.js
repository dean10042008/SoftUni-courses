function combinations(input) {
    let target = Number(input[0]);
    let correctCombos = 0;

    for (let first = 0; first <= target; first++) {
        for (let second = 0; second <= target; second++) {
            for (let third = 0; third <= target; third++) {
                let sum = first + second + third;
                if (sum === target) {
                    correctCombos++;
                }
            }
        }
    }

    console.log(correctCombos);
}

combinations(["25"]);