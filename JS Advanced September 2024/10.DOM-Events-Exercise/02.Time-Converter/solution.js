function attachEventsListeners() {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    const buttons = document.querySelectorAll("input[type=button]");
    for (const buttonEl of buttons) {
        buttonEl.addEventListener("click", () => {
            let buttonId = buttonEl.getAttribute("id");

            let dayValue = 0;
            let hoursValue = 0;
            let minutesValue = 0;
            let secondsValue = 0;

            switch (buttonId) {
                case "daysBtn":
                    dayValue = daysEl.value;
                    hoursValue = daysEl.value * 24;
                    minutesValue = daysEl.value * 1440;
                    secondsValue = daysEl.value * 86400;
                    break;
                case "hoursBtn":
                    dayValue = hoursEl.value / 24;
                    hoursValue = hoursEl.value;
                    minutesValue = hoursEl.value * 60;
                    secondsValue = hoursEl.value * 3600;
                    break;
                case "minutesBtn":
                    dayValue = minutesEl.value / 1440;
                    hoursValue = minutesEl.value / 60;
                    minutesValue = minutesEl.value;
                    secondsValue = minutesEl.value * 60;
                    break;
                case "secondsBtn":
                    dayValue = secondsEl.value / 86400;
                    hoursValue = secondsEl.value / 3600;
                    minutesValue = secondsEl.value / 60;
                    secondsValue = secondsEl.value;
                    break;
            }

            daysEl.value = dayValue;
            hoursEl.value = hoursValue;
            minutesEl.value = minutesValue;
            secondsEl.value = secondsValue;
        });
    }
}