function extractText() {
    const liItems = document.querySelectorAll("li");
    const textArea = document.getElementById("result");

    const liArray = Array.from(liItems);
    
    for (const li of liArray) {
        textArea.textContent += `${li.textContent}\n`;
    }
}