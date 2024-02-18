function excursionCalculator(input) {
    let people = Number(input[0]);
    let season = input[1];

    let price = 0;

    if (people <= 5) {
        switch (season) {
            case "spring":
                price = people * 50;
                break;
                
            case "summer":
                price = people * 48.5;
                break;
                
            case "autumn":
                price = people * 60;
                break;
                
            case "winter":
                price = people * 86;
                break;
        }
    }
    else {
        switch (season) {
            case "spring":
                price = people * 48;
                break;
                
            case "summer":
                price = people * 45;
                break;

            case "autumn":
                price = people * 49.5;
                break;
                
            case "winter":
                price = people * 85;
                break;
        }
    }

    if (season === "summer") {
        price *= 0.85;
    }
    else if (season === "winter") {
        price *= 1.08;
    }

    console.log(`${price.toFixed(2)} leva.`);
}

excursionCalculator(["5", "spring"]);