function pascalCaseSplitter(str) {
    let arr = str.split('');
    let result = [];

    while (arr.length !== 0) {
        let word = arr[0];
        let codeWord = word.charCodeAt(0);

        if (codeWord >= 65 && codeWord <= 90) {
            let j = 1;

            while (arr.length !== 0) {
                let nextSymbol = arr[j];

                if (nextSymbol === undefined) {
                    result.push((arr.splice(0)).join(""));
                }
                else {
                    let codeSymbol = nextSymbol.charCodeAt(0);

                    if (codeSymbol >= 65 && codeSymbol <= 90) {
                        let spliced = arr.splice(0, j);
                        result.push(spliced.join(""));
                        j = 1;
                    }
                    else {
                        j++;
                    }
                }
            }
        }
    }

    console.log(result.join(", "));
}

pascalCaseSplitter('SplitMeIfYouCanHaHaYouCantOrYouCan');