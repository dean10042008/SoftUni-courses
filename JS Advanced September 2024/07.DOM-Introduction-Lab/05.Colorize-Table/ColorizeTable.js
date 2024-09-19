function colorize() {
    const trs = document.querySelectorAll('tr');
    
    for (let i = 1; i < trs.length; i++) {
        if (i % 2 !== 0) {
            const tr = trs[i];
            tr.style.background = "teal";
        }
    }
}