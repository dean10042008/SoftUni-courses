function serializeString(arr) {
    const str = arr.shift();
    const result = {};

    let i = 0;

    for (const char of str) {
        if (char in result) {
            result[char] += ` ${String(i)}`;

            i++;
        }
        else {
            result[char] = String(i);
            i++;
        }
    }

    for (const resultKey in result) {
        console.log(`${resultKey}:${result[resultKey].split(" ").join('/')}`);
    }
}

serializeString(["abababa"]);