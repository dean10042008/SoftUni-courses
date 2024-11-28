const listItems = document.querySelectorAll("li:has(ul)");

listItems.forEach(item => {
    item.classList.add("closed");
    item.querySelector("ul").style.display = "none";
    
    item.addEventListener("click", (e) => {
        e.stopPropagation();
        
        if (item.classList.contains("closed")) {
            item.classList.remove("closed");
            item.classList.add("open");
            item.querySelector("ul").style.display = "block";
        }
        else {
            item.classList.remove("open");
            item.classList.add("closed");
            item.querySelector("ul").style.display = "none";
        }
    })
})