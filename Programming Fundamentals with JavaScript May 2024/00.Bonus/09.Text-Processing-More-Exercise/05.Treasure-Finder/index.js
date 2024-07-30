function treasureFinder(arr) {
    const keys = arr.shift().split(" ").map(Number);

    while (arr[0] !== "find") {
        const decrypted = arr.shift();

        let i = 0;
        let result = '';

        for (const decryptedElement of decrypted) {
            const newCode = decryptedElement.charCodeAt(0) - keys[i];
            const newChar = String.fromCharCode(newCode);

            i++;

            if (i === keys.length) {
                i = 0;
            }

            result += newChar;
        }

        const [_, product] = result.split('&');
        const coordinates = result.split("<")[1].split(">")[0];

        console.log(`Found ${product} at ${coordinates}`);
    }
}

treasureFinder(["1 2 1 3", "ikegfp'jpne)bv=41P83X@", "ujfufKt)Tkmyft'duEprsfjqbvfv=53V55XA", "find"]);