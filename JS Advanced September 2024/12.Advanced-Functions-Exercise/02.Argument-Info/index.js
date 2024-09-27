function argumentInfo(...arr) {
    let result = {};

    for (const arrElement of arr) {
        console.log(`${typeof arrElement}: ${arrElement}`);

        if (typeof arrElement in result) {
            result[typeof arrElement]++;
        }
        else {
            result[typeof arrElement] = 1;
        }
    }

    const countArr = Object.entries(result);

    countArr.sort((a, b) => {
        return b[1] - a[1];
    });

    for (const countArrElement of countArr) {
        console.log(`${countArrElement[0]} = ${countArrElement[1]}`);
    }
}

argumentInfo('cat', 42, function () { console.log('Hello world!'); });