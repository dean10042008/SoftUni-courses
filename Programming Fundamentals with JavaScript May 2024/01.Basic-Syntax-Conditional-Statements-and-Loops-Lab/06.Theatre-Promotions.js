function theatrePromotions(typeOfDay, age) {
    let price = 0;
    switch(typeOfDay) {
        case "Weekday":
            if (age >= 0 && age <= 18) {
                price = 12;
                break;
            }
            else if (age >= 18 && age <= 64) {
                price = 18;
                break;
            }
            else if (age >= 64 && age <= 122) {
                price = 12;
                break;
            }
            else {
                console.log("Error!");
                return;
            }

        case "Weekend":
            if (age >= 0 && age <= 18) {
                price = 15;
                break;
            }
            else if (age >= 18 && age <= 64) {
                price = 20;
                break;
            }
            else if (age >= 64 && age <= 122) {
                price = 15;
                break;
            }
            else {
                console.log("Error!");
                return;
            }

        case "Holiday":
            if (age >= 0 && age <= 18) {
                price = 5;
                break;
            }
            else if (age >= 18 && age <= 64) {
                price = 12;
                break;
            }
            else if (age >= 64 && age <= 122) {
                price = 10;
                break;
            }
            else {
                console.log("Error!");
                return;
            }
    }
    console.log(`${price}$`);
}

theatrePromotions('Weekday', 42);