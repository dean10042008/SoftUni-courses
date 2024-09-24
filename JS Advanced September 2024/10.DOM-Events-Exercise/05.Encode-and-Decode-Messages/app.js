function encodeAndDecodeMessages() {
    const inputEl = document.querySelector('main div:nth-child(1) textarea');
    const buttonToEncode = document.querySelector('main div:nth-child(1) button');
    const resultEl = document.querySelector('main div:nth-child(2) textarea');
    const buttonToDecode = document.querySelector('main div:nth-child(2) button');

    buttonToEncode.addEventListener('click', () => {
        let encodedArr = [];
        for (const char of String(inputEl.value)) {
            let asciCode = Number(char.charCodeAt());
            let newAsciCode = asciCode + 1;
            let encodedChar = String.fromCharCode(newAsciCode);
            encodedArr.push(encodedChar);
        }

        resultEl.value = encodedArr.join("");
        inputEl.value = "";
    });

    buttonToDecode.addEventListener('click', () => {
        let decodedArr = [];
        for (const char of String(resultEl.value)) {
            let asciCode = Number(char.charCodeAt());
            let newAsciCode = asciCode - 1;
            let decodedChar = String.fromCharCode(newAsciCode);
            decodedArr.push(decodedChar);
        }

        resultEl.value = decodedArr.join("");
        inputEl.value = "";
    });
}