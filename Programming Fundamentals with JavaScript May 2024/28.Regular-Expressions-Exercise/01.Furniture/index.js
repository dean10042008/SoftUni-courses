function furniture(arr) {
    const pattern = />>(?<name>\w+)<<(?<price>\d+(\.\d+)?)!(?<quantity>\d+)/;

    let command = arr.shift();
    let total = 0;

    console.log("Bought furniture:");

    while (command !== "Purchase") {
        const isValid = pattern.test(command);

        if ((parts = pattern.exec(command)) !== null) {
            console.log(parts.groups.name);
            let currentSum = Number(parts.groups.price) * Number(parts.groups.quantity);
            total += currentSum;
        }

        command = arr.shift();
    }

    console.log(`Total money spend: ${total.toFixed(2)}`);
}

furniture(['>>Sofa<<312.23!3', '>>TV<<300!5', '>Invalid<<!5', 'Purchase']);