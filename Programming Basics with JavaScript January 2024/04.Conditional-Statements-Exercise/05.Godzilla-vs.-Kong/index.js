function movie(arr) {
    let budget = Number(arr[0]);
    let peopleOnSet = Number(arr[1]);
    let priceForACostume = Number(arr[2]);

    let decoration = budget * 0.1;

    if (peopleOnSet > 150) {
        priceForACostume *= 0.9;
    }

    let totalMoney = (priceForACostume * peopleOnSet) + decoration;

    if (budget < totalMoney) {
        let difference = totalMoney - budget;
        console.log('Not enough money!');
        console.log(`Wingard needs ${difference.toFixed(2)} leva more.`);
    }
    else {
        let difference = budget - totalMoney;
        console.log('Action!');
        console.log(`Wingard starts filming with ${difference.toFixed(2)} leva left.`);
    }
}

movie(['15437.62', '186', '57.99']);