function extract(content) {
    let text = document.getElementById(content).textContent;
    let result = [];

    while (text.includes("(") && text.includes(")")) {
        const firstIndex = text.indexOf("(");
        const lastIndex = text.indexOf(")");

        const word = text.slice(firstIndex + 1, lastIndex);
        text = text.replace("(", "").replace(")", "");
        
        result.push(word);
    }

    // Should be returned, but I like to keep the console.log() instead.
    console.log(result.join("; "));
}