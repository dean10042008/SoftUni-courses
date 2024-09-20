function solve() {
    const resultEl = document.getElementById("output");
    const inputText = document.querySelector("textarea").value;
    
    let arr = inputText.split(".").filter(s => s.trim().length > 0);

    for (let i = 0; i < arr.length; i += 3) {
        let paragraphSentences = [];

        for (let j = 0; j < 3 && i + j < arr.length; j++) {
            let sentence = arr[i + j].trim();
            if (sentence.length > 0) {
                paragraphSentences.push(sentence);
            }
        }

        // Create a new paragraph element
        if (paragraphSentences.length > 0) {
            let p = document.createElement("p");
            p.textContent = paragraphSentences.join('. ') + '.';
            resultEl.appendChild(p);
        }
    }
}