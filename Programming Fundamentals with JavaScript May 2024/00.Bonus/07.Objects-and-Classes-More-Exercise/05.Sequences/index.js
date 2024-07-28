function sequence(arr) {
    const result = [];

    for (let item of arr) {
        item = JSON.parse(item).sort((a, b) => b - a);

        let isSame = false;

        for (const resultElement of result) {
            isSame = item.join("") === resultElement.join("");

            if (isSame) {
                break;
            }
        }

        if (!isSame) {
            result.push(item);
        }
    }

    result.sort((a, b) => a.length - b.length);

    for (const resultElement of result) {
        console.log(`[${resultElement.join(", ")}]`);
    }
}

sequence(["[-3, -2, -1, 0, 1, 2, 3, 4]",
    "[10, 1, -17, 0, 2, 13]",
    "[4, -3, 3, -2, 2, -1, 1, 0]"]);