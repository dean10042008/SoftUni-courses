function pascalCaseSplitter(str) {
    let words = str.split(/(?=[A-Z])/);
    console.log(words.join(', '));
}

pascalCaseSplitter('SplitMeIfYouCanHaHaYouCantOrYouCan');