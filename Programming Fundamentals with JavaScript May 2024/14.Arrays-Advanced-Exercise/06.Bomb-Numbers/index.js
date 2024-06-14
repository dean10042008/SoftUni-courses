function bombNumbers(sequence, bombInfo) {
    let bombNumber = bombInfo[0];
    let power = bombInfo[1];

    let index = sequence.indexOf(bombNumber);

    while (index !== -1) {
        let start = Math.max(0, index - power);
        let end = Math.min(sequence.length - 1, index + power);

        sequence.splice(start, end - start + 1);

        index = sequence.indexOf(bombNumber);
    }

    console.log(sequence.reduce((a, b) => a + b, 0));
}

bombNumbers([1, 2, 2, 4, 2, 2, 2, 9], [4, 2]);