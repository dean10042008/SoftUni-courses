function attachEvents() {
    const icons = {
        "Sunny": "&#x2600;",
        "Partly sunny": "&#x26C5;",
        "Overcast": "&#x2601;",
        "Rain": "&#x2614;",
        "Degrees": "&#176;"
    };

    const [locationEl, submitBtn] = document.querySelectorAll("#request > *");
    const forecastEl = document.querySelector("#forecast");
    const [currentWeatherEl, upcomingWeatherEl] = document.querySelectorAll("#forecast > div");
    
    submitBtn.addEventListener("click", async () => {
        const location = locationEl.value;
        if (location === "") return;

        try {
            const locationsRes = await fetch("http://localhost:3030/jsonstore/forecaster/locations");
            const locationsData = await locationsRes.json();

            forecastEl.style.display = "block";
            const locationCode = locationsData.find(loc => loc.name === location).code;

            const todaysWeatherRes = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${locationCode}`);
            const todaysWeatherData = await todaysWeatherRes.json();

            const forecastsEl = document.createElement("div");
            forecastsEl.classList.add("forecasts");

            const conditionSymbolIcon = document.createElement("span");
            conditionSymbolIcon.classList.add("condition");
            conditionSymbolIcon.classList.add("symbol");
            conditionSymbolIcon.innerHTML = icons[todaysWeatherData.forecast.condition];

            const conditionWeatherEl = document.createElement("span");
            conditionWeatherEl.classList.add("condition");

            conditionWeatherEl.appendChild(createSpan(todaysWeatherData.name));
            conditionWeatherEl.appendChild(createSpan(`${todaysWeatherData.forecast.low}°/${todaysWeatherData.forecast.high}°`));
            conditionWeatherEl.appendChild(createSpan(todaysWeatherData.forecast.condition));

            forecastsEl.appendChild(conditionSymbolIcon);
            forecastsEl.appendChild(conditionWeatherEl);

            currentWeatherEl.appendChild(forecastsEl);

            const upcomingWeatherRes = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`);
            const upcomingWeatherData = await upcomingWeatherRes.json();
            
            const forecastInfo = document.createElement("div");
            forecastInfo.classList.add("forecast-info");

            for (const data of upcomingWeatherData.forecast) {
                forecastInfo.appendChild(createUpcomingWeatherSpan(data));
            }

            upcomingWeatherEl.appendChild(forecastInfo)
        }
        catch (err) {
            displayError();
            console.error(err);
        }

        function createSpan(data) {
            const span = document.createElement("span");
            span.classList.add("forecast-data");
            span.textContent = data;
            return span;
        }

        function createUpcomingWeatherSpan(data) {
            const span = document.createElement("span");
            span.classList.add("upcoming");

            const iconSpanEl = document.createElement("span");
            iconSpanEl.classList.add("symbol");
            iconSpanEl.innerHTML = icons[data.condition];

            const tempSpanEl = document.createElement("span");
            tempSpanEl.classList.add("forecast-data");
            tempSpanEl.textContent = `${data.low}°/${data.high}°`;

            const conditionSpanEl = document.createElement("span");
            conditionSpanEl.classList.add("forecast-data");
            conditionSpanEl.textContent = data.condition;

            span.appendChild(iconSpanEl);
            span.appendChild(tempSpanEl);
            span.appendChild(conditionSpanEl);

            return span;
        }

        function displayError() {
            forecastEl.textContent = "Error";
        }
    });
}

attachEvents();