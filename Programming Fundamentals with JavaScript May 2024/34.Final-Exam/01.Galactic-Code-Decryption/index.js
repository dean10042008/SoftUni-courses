function galacticCodeDecryption(arr) {
    let word = arr.shift();

    while (arr[0] !== "Finalize") {
        const tokens = arr.shift().split(" ");
        const command = tokens.shift();

        if (command === "Encrypt") {
            let arr = word.split("");
            word = arr.reverse().join("");
            console.log(word);
        }
        else if (command === "Decrypt") {
            let reversedLetters = "";

            for (let i = 0; i < word.length; i++) {
                if (word[i] === word[i].toUpperCase()) {
                    reversedLetters += word[i].toLowerCase();
                }
                else {
                    reversedLetters += word[i].toUpperCase();
                }
            }
            word = reversedLetters;
            console.log(word);
        }
        else if (command === "Substitute") {
            const oldChar = tokens.shift();
            const newChar = tokens.shift();

            if (!word.includes(oldChar)) {
                console.log("Character not found.");
            }
            else {
                word = word.split(oldChar).join(newChar);
                console.log(word);
            }
        }
        else if (command === "Scramble") {
            const index = Number(tokens.shift());
            const char = tokens.shift();

            if (index < 0 || index >= word.length) {
                console.log("Index out of bounds.");
            }
            else {
                let fp = word.substring(0, index);
                let lp = word.substring(index + 1);
                word = fp + char + lp;
                console.log(word);
            }
        }
        else if (command === "Remove") {
            const substring = tokens.shift();

            while (word.includes(substring)) {
                word = word.replace(substring, "");
            }

            console.log(word);
        }
        else {
            console.log("Invalid command detected!");
        }
    }
}

galacticCodeDecryption(["helloWorld", "Encrypt", "Decrypt", "Substitute L z", "Remove O", "Scramble 0 H", "Invalid command detected!", "Finalize"]);