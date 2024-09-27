function listProcessor(arr) {
    let result = [];

    for (const arrElement of arr) {
        if (arrElement === "print") {
            console.log(result.join(','));
        }
        else {
            const [command, word] = arrElement.split(" ");

            if (command === "add") {
                result.push(word);
            }
            else if (command === "remove") {
                while (result.includes(word)) {
                    let index = result.indexOf(word);
                    result.splice(index, 1);
                }
            }
        }
    }
}

listProcessor(['add hello', 'add again', 'remove hello', 'add again', 'print']);