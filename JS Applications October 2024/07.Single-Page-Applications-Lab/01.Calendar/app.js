const convertMonthsWithWordsToNumbers = (word) => {
    const months = {
        Jan: 1,
        Feb: 2,
        Mar: 3,
        Apr: 4,
        May: 5,
        Jun: 6,
        Jul: 7,
        Aug: 8,
        Sept: 9,
        Oct: 10,
        Nov: 11,
        Dec: 12
    };

    return months[word];
}

const yearsEl = document.getElementById("years"); 
const yearOptions = document.querySelectorAll(".yearsCalendar td.day");
const monthOptions = document.querySelectorAll(".monthCalendar");
const daysOptions = document.querySelectorAll(".daysCalendar");

monthOptions.forEach(monthOption => {
    monthOption.style.display = "none";
});

daysOptions.forEach(dayOption => {
    dayOption.style.display = "none";
});

yearOptions.forEach((option) => {
    option.addEventListener("click", () => {
        const year = option.querySelector(".date").textContent;

        const selectedYearEl = document.querySelector(`#year-${year}`);
        selectedYearEl.style.display = "block";
        yearsEl.style.display = "none";

        selectedYearEl.querySelector(".calendar > caption").addEventListener("click", () => {
            selectedYearEl.style.display = "none";
            yearsEl.style.display = "block";
        });

        const monthOptionEls = selectedYearEl.querySelectorAll("td.day");
        
        monthOptionEls.forEach((monthOption) => {
            monthOption.addEventListener("click", () => {
                const month = monthOption.querySelector(".date").textContent;
                const monthNumber = convertMonthsWithWordsToNumbers(month);
                const selectedMonthEl = document.querySelector(`#month-${year}-${monthNumber}`);

                selectedMonthEl.style.display = "block";
                monthOption.closest(".monthCalendar").style.display = "none";

                selectedMonthEl.querySelector(".calendar > caption").addEventListener("click", () => {
                    selectedMonthEl.style.display = "none";
                    monthOption.closest(".monthCalendar").style.display = "block";
                });
            });
        });
    });
});