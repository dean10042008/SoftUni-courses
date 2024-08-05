function printDNA(length) {
    const sequence = "ATCGTTAGGG";
    const patterns = [
        "**XY**",
        "*X--Y*",
        "X----Y",
        "*X--Y*"
    ];

    let seqIndex = 0;

    for (let i = 0; i < length; i++) {
        let pattern = patterns[i % patterns.length];
        let x = sequence[seqIndex % sequence.length];
        let y = sequence[(seqIndex + 1) % sequence.length];
        seqIndex += 2;

        let result = pattern.replace('X', x).replace('Y', y);
        console.log(result);
    }
}

printDNA(4);