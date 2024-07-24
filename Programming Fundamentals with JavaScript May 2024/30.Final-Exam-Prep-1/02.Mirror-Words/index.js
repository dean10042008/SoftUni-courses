function mirrorWords(arr) {
    const regex = /([@|#])(?<wordOne>[A-z]{3,})\1\1(?<wordTwo>[A-z]{3,})\1/g;

    const pairsArr = arr[0].matchAll(regex);
    const pairs = Array.from(pairsArr);

    if (pairs.length === 0) {
        console.log("No word pairs found!");
        console.log("No mirror words!");
    }

    else {
        console.log(`${pairs.length} word pairs found!`);

        const mirrorWords = [];

        for (const match of pairs) {
            const { wordOne, wordTwo } = match.groups;

            if (wordOne === wordTwo.split("").reverse().join("")) {
                mirrorWords.push(`${wordOne} <=> ${wordTwo}`);
            }
        }

        if (mirrorWords.length === 0) {
            console.log("No mirror words!");
        }
        else {
            console.log("The mirror words are:");
            console.log(mirrorWords.join(", "));
        }
    }
}

mirrorWords(['@mix#tix3dj#poOl##loOp#wl@@bong&song%4very$long@thong#Part##traP##@@leveL@@Level@##car#rac##tu@pack@@ckap@#rr#sAw##wAs#r#@w1r']);