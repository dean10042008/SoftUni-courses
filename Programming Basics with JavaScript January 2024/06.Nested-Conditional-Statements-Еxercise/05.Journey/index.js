function journey(input) {
    let budget = Number(input[0]);
    let season = input[1];

    let price = 0;
    let destination = '';
    let destinationType = '';

    if (budget <= 100) {
        destination = 'Bulgaria';
        
        if (season === 'summer') {
            destinationType = 'Camp';
            price = budget * 0.3;
        }
        else {
            destinationType = 'Hotel';
            price = budget * 0.7;
        }
    }
    else if (budget <= 1000) {
        destination = 'Balkans';

        if (season === 'summer') {
            destinationType = 'Camp';
            price = budget * 0.4;
        }
        else {
            destinationType = 'Hotel';
            price = budget * 0.8;
        }
    }
    else {
        destination = "Europe";
        destinationType = "Hotel";
        price = budget * 0.9;
    }

    console.log(`Somewhere in ${destination}`);
    console.log(`${destinationType} - ${price.toFixed(2)}`);
}

journey(["50", "summer"]);
journey(["75", "winter"]);
journey(["312", "summer"])
journey(["678.53", "winter"]);
journey(["1500", "summer"]);