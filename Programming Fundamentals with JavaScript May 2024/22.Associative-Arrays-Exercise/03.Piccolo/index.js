function piccolo(arr) {
    let result = {};

    arr.forEach((item) => {
        const [command, plateNum] = item.split(', ');

        if (command === "IN") {
            result[plateNum] = plateNum;
        }
        else {
            delete result[plateNum];
        }
    });

    let entries = Object.entries(result);

    if (entries.length === 0) {
        console.log(`Parking Lot is Empty`);
        return;
    }

    entries.sort(([keyA, valueA], [keyB, valueB]) => {
        return keyA.localeCompare(keyB);
    });
    entries.forEach(combination => {
        console.log(combination[1]);
    })
}

piccolo(['IN, CA2844AA', 'IN, CA1234TA', 'OUT, CA2844AA', 'IN, CA9999TT', 'IN, CA2866HI', 'OUT, CA1234TA', 'IN, CA2844AA', 'OUT, CA2866HI', 'IN, CA9876HH', 'IN, CA2822UU']);