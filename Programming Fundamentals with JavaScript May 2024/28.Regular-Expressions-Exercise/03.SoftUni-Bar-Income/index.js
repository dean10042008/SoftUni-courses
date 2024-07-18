function softUniBarIncome(arr) {
    const pattern = /%(?<name>[A-Z][a-z]+)%.*<(?<product>\w+)>.*\|(?<price>\d+)\|.*?(?<quantity>\d+(\.\d+)?)\$/;
    let sum = 0;

    let command = arr.shift();

    while (command !== 'end of shift') {
        let isValid = pattern.test(command);

        if (isValid) {
            if ((parts = pattern.exec(command)) !== null) {
                const name = parts.groups.name;
                const item = parts.groups.product;
                const total = Number(parts.groups.price) * Number(parts.groups.quantity);

                console.log(`${name}: ${item} - ${total.toFixed(2)}`);
                sum += total;
            }
        }

        command = arr.shift();
    }

    console.log(`Total income: ${sum.toFixed(2)}`);
}

softUniBarIncome(['%George%<Croissant>|2|10.3$', '%Peter%<Gum>|1|1.3$', '%Maria%<Cola>|1|2.4$', 'end of shift']);