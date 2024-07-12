function lettersChangeNumbers(numbers) {
    const alphabet = {
        a: 1,
        b: 2,
        c: 3,
        d: 4,
        e: 5,
        f: 6,
        g: 7,
        h: 8,
        i: 9,
        j: 10,
        k: 11,
        l: 12,
        m: 13,
        n: 14,
        o: 15,
        p: 16,
        q: 17,
        r: 18,
        s: 19,
        t: 20,
        u: 21,
        v: 22,
        w: 23,
        x: 24,
        y: 25,
        z: 26
    }
    let sum = 0;

    let numArr = numbers.split(' ');
    for (const combination of numArr) {
        if (combination.length === 0) {
            continue;
        }

        const firstLetter = combination[0];
        const lastLetter = combination[combination.length - 1];
        let numberToModify = Number(combination.substring(1, combination.length - 1));

        const flCode = firstLetter.charCodeAt(0);
        const llCode = lastLetter.charCodeAt(0);

        if (flCode >= 97 && flCode <= 122) {
            numberToModify *= alphabet[firstLetter];
        }
        else if (flCode >= 65 && flCode <= 90) {
            const lowercased = firstLetter.toLowerCase();
            numberToModify /= alphabet[lowercased];
        }

        if (llCode >= 97 && llCode <= 122) {
            numberToModify += alphabet[lastLetter];
        }
        else if (llCode >= 65 && llCode <= 90) {
            const lowercased = lastLetter.toLowerCase();
            numberToModify -= alphabet[lowercased];
        }

        sum += numberToModify;
    }

    console.log(sum.toFixed(2));
}

lettersChangeNumbers('A12b s17G');