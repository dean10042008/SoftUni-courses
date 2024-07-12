function hardWord(arr) {
    let text = arr[0].split(" ");
    let wordsToFill = arr[1];

    for (const wordToFill of wordsToFill) {
        let j = 0;

        for (let wordInText of text) {
            // if (wordInText.includes(".") || wordInText.includes(",") || wordInText.includes("?") || wordInText.includes("!")) {
            //     wordInText = wordInText.substring(0, wordInText.length - 1);
            // }

            if ((wordToFill.length === wordInText.length) && wordInText.includes("_")) {
                text.splice(j, 1, wordToFill);
            }
            else if ((wordInText.includes(".") || wordInText.includes(",") || wordInText.includes("?") || wordInText.includes("!")) && wordInText.includes("_") && wordToFill.length + 1 === wordInText.length) {
                let symbol = wordInText.substring(wordInText.length - 1);
                wordInText = wordInText.substring(0, wordInText.length - 1);
                text.splice(j, 1, wordToFill + symbol);
            }

            j++;
        }
    }

    console.log(text.join(" "));
}

hardWord(['Hi, grandma! I\'m so ____ to write to you. ______ the winter vacation, so _______ things happened. My dad bought me a sled. Mom started a new job as a __________. My brother\'s ankle is ________, and now it bothers me even more. Every night Mom cooks ___ on your recipe because it is the most delicious. I hope this year Santa will _____ me a robot.', ['pie', 'bring', 'glad', 'During', 'amazing', 'pharmacist', 'sprained']]);