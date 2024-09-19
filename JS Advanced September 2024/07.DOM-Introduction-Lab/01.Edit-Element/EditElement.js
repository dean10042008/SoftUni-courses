function editElement(el, text, replacement) {
    while (el.textContent.includes(text)) {
        el.textContent = el.textContent.replace(text, replacement);
    }
}