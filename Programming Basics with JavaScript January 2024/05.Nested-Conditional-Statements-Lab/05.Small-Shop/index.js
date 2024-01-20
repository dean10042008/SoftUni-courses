function shop(input) {
    let product = input[0];
    let city = input[1];
    let amount = Number(input[2]);

    let finalPrice = 0;

    if (city === 'Sofia') {
        switch (product) {
            case 'coffee':
                finalPrice = amount * 0.50;
                break;
            case 'water':
                finalPrice = amount * 0.80;
                break;
            case 'beer':
                finalPrice = amount * 1.20;
                break;
            case 'sweets':
                finalPrice = amount * 1.45;
                break;
            case 'peanuts':
                finalPrice = amount * 1.60;
                break;
        }
    }
    else if (city === 'Plovdiv') {
        switch (product) {
            case 'coffee':
                finalPrice = amount * 0.40;
                break;
            case 'water':
                finalPrice = amount * 0.70;
                break;
            case 'beer':
                finalPrice = amount * 1.15;
                break;
            case 'sweets':
                finalPrice = amount * 1.30;
                break;
            case 'peanuts':
                finalPrice = amount * 1.50;
                break;
        }
    }
    else if (city === 'Varna') {
        switch (product) {
            case 'coffee':
                finalPrice = amount * 0.45;
                break;
            case 'water':
                finalPrice = amount * 0.70;
                break;
            case 'beer':
                finalPrice = amount * 1.10;
                break;
            case 'sweets':
                finalPrice = amount * 1.35;
                break;
            case 'peanuts':
                finalPrice = amount * 1.55;
                break;
        }
    }
    console.log(finalPrice);
}

shop(["peanuts", "Plovdiv", "1"])