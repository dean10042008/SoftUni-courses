function numberModification(num) {
    let numAsStr = num.toString();
    let sum = 0;

    for (const numAsStrElement of numAsStr) {
        sum += Number(numAsStrElement);
    }

    let average = sum / numAsStr.length;

    while (average <= 5) {
        sum = 0;

        numAsStr += '9';

        for (const numAsStrElement of numAsStr) {
            sum += Number(numAsStrElement);
        }

        average = sum / numAsStr.length;
    }

    console.log(numAsStr);
}

numberModification(101);