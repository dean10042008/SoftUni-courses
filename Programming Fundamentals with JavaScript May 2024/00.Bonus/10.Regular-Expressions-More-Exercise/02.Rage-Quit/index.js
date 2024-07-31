function rageQuit(str) {
    const regex = /(?<chars>[^\d]+)(?<numberAsStr>\d+)/g;

    let match = regex.exec(str);

    const unique = new Set();
    let result = "";

    while (match) {
        let {chars, numberAsStr} = match.groups;
        let uppercasedStr = "";

        for (const char of chars) {
            const uppercased = char.toUpperCase();

            if (Number(numberAsStr) !== 0) {
                unique.add(uppercased);
            }

            uppercasedStr += uppercased;
        }

        const num = Number(numberAsStr);

        for (let j = 1; j <= num; j++) {
            result += uppercasedStr;
        }

        match = regex.exec(str);
    }

    console.log(`Unique symbols used: ${unique.size}`);
    console.log(result);
}

rageQuit("a3");