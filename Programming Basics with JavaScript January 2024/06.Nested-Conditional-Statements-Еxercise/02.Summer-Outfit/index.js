function summer(input) {
    let temp = Number(input[0]);
    let partOfDay = input[1];

    let outfit = '';
    let shoes = '';

    switch (partOfDay) {
        case 'Morning':
            if (temp <= 18) {
                outfit = 'Sweatshirt'
                shoes = 'Sneakers';
            }
            else if (temp <= 24) {
                outfit = 'Shirt';
                shoes = 'Moccasins';
            }
            else {
                outfit = 'T-Shirt';
                shoes = 'Sandals';
            }
            break;
        case 'Afternoon':
            if (temp <= 18) {
                outfit = 'Shirt'
                shoes = 'Moccasins';
            }
            else if (temp <= 24) {
                outfit = 'T-Shirt';
                shoes = 'Sandals';
            }
            else {
                outfit = 'Swim Suit';
                shoes = 'Barefoot';
            }
            break;
        case 'Evening':
            if (temp <= 18) {
                outfit = 'Shirt'
                shoes = 'Moccasins';
            }
            else if (temp <= 24) {
                outfit = 'Shirt';
                shoes = 'Moccasins';
            }
            else {
                outfit = 'Shirt';
                shoes = 'Moccasins';
            }
            break; 
    }
    console.log(`It's ${temp} degrees, get your ${outfit} and ${shoes}.`);
}

summer(["28", "Evening"]);