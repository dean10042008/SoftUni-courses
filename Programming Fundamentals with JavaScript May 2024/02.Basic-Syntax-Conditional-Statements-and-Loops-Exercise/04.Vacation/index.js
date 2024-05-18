function vacation(numberOfPeople, typeOfGroup, dayOfWeek) {
    let singlePrice = 0;

    switch (dayOfWeek) {
        case "Friday":
            switch (typeOfGroup) {
                case "Students":
                    singlePrice = 8.45;
                    break;
                case "Business":
                    singlePrice = 10.90;
                    break;
                case "Regular":
                    singlePrice = 15;
                    break;
            }
    }

    switch (dayOfWeek) {
        case "Saturday":
            switch (typeOfGroup) {
                case "Students":
                    singlePrice = 9.80;
                    break;
                case "Business":
                    singlePrice = 15.60;
                    break;
                case "Regular":
                    singlePrice = 20;
                    break;
            }
    }

    switch (dayOfWeek) {
        case "Sunday":
            switch (typeOfGroup) {
                case "Students":
                    singlePrice = 10.46;
                    break;
                case "Business":
                    singlePrice = 16;
                    break;
                case "Regular":
                    singlePrice = 22.50;
                    break;
            }
    }

    let totalPrice = numberOfPeople * singlePrice;

    if (typeOfGroup === "Students" && numberOfPeople >= 30) {
        totalPrice *= 0.85;
    }
    else if (typeOfGroup === "Business" && numberOfPeople >= 100) {
        totalPrice  -= 10 * singlePrice;
    }
    else if (typeOfGroup === "Regular" && (numberOfPeople >= 10 && numberOfPeople <= 20)) {
        totalPrice *= 0.95;
    }

    console.log(`Total price: ${totalPrice.toFixed(2)}`);
}

vacation(30, "Students", "Sunday");