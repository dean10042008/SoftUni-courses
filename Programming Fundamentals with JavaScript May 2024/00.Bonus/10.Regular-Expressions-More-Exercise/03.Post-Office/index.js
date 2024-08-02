function postOffice(arr) {
    const findCapitals = /([#$%&*])(?<firstPart>[A-Z]+)\1/g;
    const findCodesAndLength = /(?<ascii>\d+):(?<length>\d{2})/g;

    // const words = arr[0].split("|")[2].split(" ");
    const [firstGroup, secondGroup, thirdGroup] = arr[0].split("|");
    const words = thirdGroup.split(" ");

    // const capitals = findCapitals.exec(firstGroup).groups.firstPart.split("");
    let capitalMatch = findCapitals.exec(firstGroup);
    const capitals = [];

    while (capitalMatch) {
        const letters = capitalMatch.groups.firstPart.split("");

        letters.forEach((letter) => {
            capitals.push(letter);
        })

        capitalMatch = findCapitals.exec(firstGroup);
    }

    let codesLengths = [];

    let match = findCodesAndLength.exec(secondGroup);

    while (match) {
        let {ascii, length} = match.groups;
        ascii = Number(ascii);
        length = Number(length);

        if (ascii >= 65 && ascii <= 90) {
            let letter = String.fromCharCode(ascii);

            if (capitals.includes(letter)) {
                codesLengths.push([letter, Number(length)]);
            }
        }

        match = findCodesAndLength.exec(secondGroup);
    }

    for (const word of words) {
        if (word === " ") {
            continue;
        }


        for (const [letter, length] of codesLengths) {
            if (capitals.includes(word[0]) && (word[0] === letter) && (word.length === (length + 1))) {
                console.log(word);
                break;
            }
        }
    }
}

postOffice(["sdsGGasAOTPWEEEdas$AOTP$|a65:1.2s65:03d79:01ds84:02! -80:07++ABs90:1.1|adsaArmyd Gara So La Arm Armyw21 Argo O daOfa Or Ti Sar saTheww The Parahaos"]);