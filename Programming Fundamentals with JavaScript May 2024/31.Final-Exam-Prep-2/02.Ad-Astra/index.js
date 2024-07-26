function adAstra(arr) {
    const regex = /(#|\|)(?<itemName>[A-Za-z ]+)\1(?<expirationDate>\d{2}\/\d{2}\/\d{2})\1(?<calories>\d+)\1/g;

    let match = regex.exec(arr);
    let sum = 0;

    while (match) {
        const {itemName, expirationDate, calories} = match.groups;
        sum += Number(calories);

        match = regex.exec(arr);
    }

    console.log(`You have food to last you for: ${Math.floor(sum / 2000)} days!`);

    let match2 = regex.exec(arr);

    while (match2) {
        const {itemName, expirationDate, calories} = match2.groups;
        console.log(`Item: ${itemName}, Best before: ${expirationDate}, Nutrition: ${calories}`);

        match2 = regex.exec(arr);
    }
}

adAstra(['#Bread#19/03/21#4000#|Invalid|03/03.20||Apples|08/10/20|200||Carrots|06/08/20|500||Not right|6.8.20|5|']);