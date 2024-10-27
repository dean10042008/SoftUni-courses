async function solution() {
    const mainEl = document.querySelector('#main');
    mainEl.textContent = "";

    const res = await fetch("http://localhost:3030/jsonstore/advanced/articles/list");
    const data = await res.json();

    for (const element of data) {
        const accordionSectionEl = await createAccordion(element);
        mainEl.appendChild(accordionSectionEl);
    }

    async function createAccordion(element) {
        const textRes = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${element._id}`);
        const text = await textRes.json();

        const accordionSectionEl = document.createElement("div");
        accordionSectionEl.classList.add("accordion");

        const headDivEl = document.createElement("div");
        headDivEl.classList.add("head");

        const titleEl = document.createElement("span");
        titleEl.textContent = element.title;

        const buttonEl = document.createElement("button");
        buttonEl.textContent = "More";
        buttonEl.classList.add("button");
        buttonEl.id = element._id;

        const extraDivEl = document.createElement("div");
        extraDivEl.classList.add("extra");

        const p = document.createElement("p");
        p.textContent = text.content;

        extraDivEl.appendChild(p);

        buttonEl.addEventListener("click", () => {
            if (extraDivEl.style.display === "none") {
                extraDivEl.style.display = "block";
                buttonEl.textContent = "Less";
            }
            else {
                extraDivEl.style.display = "none";
                buttonEl.textContent = "More";
            }
        });

        headDivEl.appendChild(titleEl);
        headDivEl.appendChild(buttonEl);

        accordionSectionEl.appendChild(headDivEl);
        accordionSectionEl.appendChild(extraDivEl);

        return accordionSectionEl;
    }
}

solution();