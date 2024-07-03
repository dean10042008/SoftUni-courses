function addressBook(arr) {
    let result = {};

    for (const combination of arr) {
        const [name, address] = combination.split(":");

        result[name] = address;
    }

    let entries = Object.entries(result);

    entries.sort((a, b) => {
        const keyA = a[0];
        const keyB = b[0];

        return keyA.localeCompare(keyB);
    });

    for (const entry of entries) {
        console.log(`${entry[0]} -> ${entry[1]}`);
    }
}

addressBook(['Tim:Doe Crossing', 'Bill:Nelson Place', 'Peter:Carlyle Ave', 'Bill:Ornery Rd']);