function breakfastRobot() {
    let microelementsAvaliable = {
        'protein': 0,
        'carbohydrate': 0,
        'fat': 0,
        'flavour': 0
    }

    const handleCookRequest = (command) => {
        if (command === 'report') {
            let reportMsg = [];
            for (const microelementsAvaliableKey in microelementsAvaliable) {
                reportMsg.push(`${microelementsAvaliableKey}=${microelementsAvaliable[microelementsAvaliableKey]}`);
            }

            return reportMsg.join(' ');
        }
        else if (command.includes("restock")) {
            const [_, microEl, amount] = command.split(' ');

            microelementsAvaliable[microEl] += Number(amount);

            return "Success";
        }
        else if (command.includes("prepare")) {
            const [_, recipe, quantity] = command.split(' ');

            let failedProduct = '';

            for (let i = 1; i <= quantity; i++) {
                switch (recipe) {
                    case 'apple':
                        if (microelementsAvaliable.carbohydrate - 1 < 0) {
                            failedProduct = "carbohydrate";
                            return `Error: not enough ${failedProduct} in stock`;
                        }
                        if (microelementsAvaliable.flavour - 2 < 0) {
                            failedProduct = "flavour";
                            return `Error: not enough ${failedProduct} in stock`;
                        }


                        microelementsAvaliable.carbohydrate -= 1;
                        microelementsAvaliable.flavour -= 2;

                        break;

                    case 'lemonade':
                        if (microelementsAvaliable.carbohydrate - 10 < 0) {
                            failedProduct = "carbohydrate";
                            return `Error: not enough ${failedProduct} in stock`;
                        }
                        if (microelementsAvaliable.flavour - 20 < 0) {
                            failedProduct = "flavour";
                            return `Error: not enough ${failedProduct} in stock`;
                        }

                        microelementsAvaliable.carbohydrate -= 10;
                        microelementsAvaliable.flavour -= 20;

                        break;

                    case 'burger':
                        if (microelementsAvaliable.carbohydrate - 5 < 0) {
                            failedProduct = "carbohydrate";
                            return `Error: not enough ${failedProduct} in stock`;
                        }
                        if (microelementsAvaliable.fat - 7 < 0) {
                            failedProduct = "fat";
                            return `Error: not enough ${failedProduct} in stock`;
                        }
                        if (microelementsAvaliable.flavour - 3 < 0) {
                            failedProduct = "flavour";
                            return `Error: not enough ${failedProduct} in stock`;
                        }


                        microelementsAvaliable.carbohydrate -= 5;
                        microelementsAvaliable.fat -= 7;
                        microelementsAvaliable.flavour -= 3;

                        break;

                    case 'eggs':
                        if (microelementsAvaliable.protein - 5 < 0) {
                            failedProduct = "protein";
                            return `Error: not enough ${failedProduct} in stock`;
                        }
                        if (microelementsAvaliable.fat - 1 < 0) {
                            failedProduct = "fat";
                            return `Error: not enough ${failedProduct} in stock`;
                        }
                        if (microelementsAvaliable.flavour - 1 < 0) {
                            failedProduct = "flavour";
                            return `Error: not enough ${failedProduct} in stock`;
                        }


                        microelementsAvaliable.protein -= 5;
                        microelementsAvaliable.fat -= 1;
                        microelementsAvaliable.flavour -= 1;

                        break;

                    case 'turkey':
                        if (microelementsAvaliable.protein - 10 < 0) {
                            failedProduct = "protein";
                            return `Error: not enough ${failedProduct} in stock`;
                        }
                        if (microelementsAvaliable.carbohydrate - 10 < 0) {
                            failedProduct = "carbohydrate";
                            return `Error: not enough ${failedProduct} in stock`;
                        }
                        if (microelementsAvaliable.fat - 10 < 0) {
                            failedProduct = "fat";
                            return `Error: not enough ${failedProduct} in stock`;
                        }
                        if (microelementsAvaliable.flavour - 10 < 0) {
                            failedProduct = "flavour";
                            return `Error: not enough ${failedProduct} in stock`;
                        }


                        microelementsAvaliable.protein -= 10;
                        microelementsAvaliable.carbohydrate -= 10;
                        microelementsAvaliable.fat -= 10;
                        microelementsAvaliable.flavour -= 10;

                        break;
                }
            }

            return "Success";
        }
    }

    return handleCookRequest;
}

let manager = breakfastRobot();
console.log(manager("restock flavour 50")); // Success
console.log(manager("prepare lemonade 4")); // Error: not enough carbohydrate in stock