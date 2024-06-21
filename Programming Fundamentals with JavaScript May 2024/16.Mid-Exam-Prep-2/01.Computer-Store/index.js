function computerStore(arr) {
    let withoutTaxes = 0;

    let i = 0;
    let command = arr[i];
    i++;

    while (command !== "special" && command !== "regular") {
        let price = Number(command);

        if (price < 0) {
            console.log("Invalid price!");
        }
        else {
            withoutTaxes += Number(price);
        }

        command = arr[i];
        i++;
    }

    if (withoutTaxes === 0) {
        console.log("Invalid order!");
        return;
    }

    const taxes = withoutTaxes * 0.2;
    let total = withoutTaxes + taxes;

    if (command === "special") {
        total *= 0.9;
    }

    console.log("Congratulations you've just bought a new computer!");
    console.log(`Price without taxes: ${withoutTaxes.toFixed(2)}$`);
    console.log(`Taxes: ${taxes.toFixed(2)}$`);
    console.log("-----------");
    console.log(`Total price: ${total.toFixed(2)}$`);
}

computerStore(['1050', '200', '450', '2', '18.50', '16.86', 'special']);