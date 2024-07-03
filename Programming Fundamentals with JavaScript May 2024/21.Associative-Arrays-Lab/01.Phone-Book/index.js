function phoneBook(arr) {
    let result = {};
    for (const arrElement of arr) {
        const [name, num] = arrElement.split(" ");

        result[name] = num;
    }

    for (const name in result) {
        console.log(`${name} -> ${result[name]}`);
    }
}

phoneBook(['Tim 0834212554', 'Peter 0877547887', 'Bill 0896543112', 'Tim 0876566344']);