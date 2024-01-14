// Бюджетът на Петър - реално число в интервала [0.0…100000.0]
// Броят видеокарти - цяло число в интервала [0…100]
// Броят процесори - цяло число в интервала [0…100]
// Броят рам памет - цяло число в интервала [0…100]
// Видеокарта – 250 лв./бр.
// Процесор – 35% от цената на закупените видеокарти/бр.
// Рам памет – 10% от цената на закупените видеокарти/бр.
// Ако броя на видеокартите е по-голям от този на процесорите получава 15% отстъпка от крайната сметка

function shopping(arr) {
    let budget = Number(arr[0]);
    let priceGPUs = Number(arr[1]) * 250;
    let priceCPUs = Number(arr[2]) * (0.35 * priceGPUs);
    let priceRAMcards = Number(arr[3]) * (0.1 * priceGPUs);

    totalPrice = priceGPUs + priceCPUs + priceRAMcards;

    if (Number(arr[1]) > Number(arr[2])) {
        totalPrice *= 0.85;
    }

    if (budget > totalPrice) {
        difference = budget - totalPrice;
        console.log(`You have ${difference.toFixed(2)} leva left!`);
    }
    else {
        difference = totalPrice - budget;
        console.log(`Not enough money! You need ${difference.toFixed(2)} leva more!`);
    }
}

shopping(['900', '2', '1', '3'])