function attachEvents() {
    const url = "http://localhost:3030/jsonstore/messenger";
    const [textareaEl, authorInputEl, contentInputEl, submitBtn, refreshBtn] = ["textarea", "[name='author']", "[name='content']", "#submit", "#refresh"].map(sel => document.querySelector(sel));

    submitBtn.addEventListener("click", async () => {
        const author = authorInputEl.value;
        const content = contentInputEl.value;

        if (author === "" || content === "") return;

        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ author, content })
        });

        const data = await res.json();
        console.log(data);
    });

    refreshBtn.addEventListener("click", async () => {
        const res = await fetch(url);
        const data = Object.values(await res.json());

        textareaEl.textContent = data
            .map(({ author, content }) => `${author}: ${content}`)
            .join("\n");
    });
}

attachEvents();