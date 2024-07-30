function valueOfAString(arr) {
    const [str, type] = arr;
    let sum = 0;

    if (type === "LOWERCASE") {
        for (const char of str) {
            const code = char.charCodeAt(0);

            if (code >= 97 && code <= 122) {
                sum += code;
            }
        }
    }
    else {
        for (const char of str) {
            const code = char.charCodeAt(0);

            if (code >= 65 && code <= 90) {
                sum += code;
            }
        }
    }

    console.log(`The total sum is: ${sum}`)
}

valueOfAString(['HelloFromMyAwesomePROGRAM', 'LOWERCASE']);