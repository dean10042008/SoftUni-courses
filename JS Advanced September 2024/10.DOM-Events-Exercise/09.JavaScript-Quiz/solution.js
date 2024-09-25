function solve() {
    const sections = document.querySelectorAll("section");

    const resultEl = document.querySelector("#results h1");
    let rightAnswerCount = 0;

    for (let i = 0; i < sections.length; i++) {
        let sectionEl = sections[i];
        let nextSectionEl = sections[i + 1];
        const liEls = sectionEl.querySelectorAll("li");

        for (const li of liEls) {
            li.addEventListener("click", (e) => {
                const answerEl = e.target;
                sectionEl.style.display = "none";

                if (answerEl.textContent === "onclick" || answerEl.textContent === "JSON.stringify()" || answerEl.textContent === "A programming API for HTML and XML documents") {
                    rightAnswerCount++;
                }

                if (nextSectionEl) {
                    nextSectionEl.style.display = "block";
                }
                else {
                    document.getElementById("results").style.display = "block";

                    if (rightAnswerCount === 3) {
                        resultEl.textContent = "You are recognized as top JavaScript fan!";
                    }
                    else {
                        resultEl.textContent = `You have ${rightAnswerCount} right answers`;
                    }
                }
            });
        }
    }
}