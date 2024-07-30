function melrahShake(arr) {
    let [str, pattern] = arr;

    let firstIndex = str.indexOf(pattern);
    let lastIndex = str.lastIndexOf(pattern);

    while (firstIndex !== -1 && lastIndex !== -1 && pattern.length !== 0) {
        const fp = str.substring(0, firstIndex);
        const mp = str.substring(firstIndex + pattern.length, lastIndex);
        const lp = str.substring(lastIndex + pattern.length);

        str = fp + mp + lp;
        console.log("Shaked it.");

        const patternFp = pattern.slice(0, pattern.length / 2);
        const patternLp = pattern.slice((pattern.length / 2) + 1);
        pattern = patternFp + patternLp;
        firstIndex = str.indexOf(pattern);
        lastIndex = str.lastIndexOf(pattern);
    }

    console.log("No shake.");
    console.log(str);
}

melrahShake(['astalavista baby', 'sta']);