function asciiSumator(arr) {
    let firstCode = arr.shift().charCodeAt(0);
    let lastCode = arr.shift().charCodeAt(0);
    const str = arr.shift();

    if (firstCode > lastCode) {
        const old = firstCode;
        firstCode = lastCode;
        lastCode = old;
    }

    let sum = 0;

    for (const char of str) {
        const code = char.charCodeAt(0);

        if (code > firstCode && code < lastCode) {
            sum += code;
        }
    }

    console.log(sum);
}

asciiSumator(['.', '@', 'dsg12gr5653feee5']);