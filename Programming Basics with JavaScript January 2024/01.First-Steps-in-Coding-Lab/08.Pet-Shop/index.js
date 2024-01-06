function solvePetFood(arr) {
    let priceForDogFood = arr[0] * 2.50;
    let priceForCatFood = arr[1] * 4;
    let total = priceForCatFood + priceForDogFood;

    console.log(`${total} lv.`);
}

solvePetFood([5, 4]);