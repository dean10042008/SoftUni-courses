function addAndRemove(arr) {
    let result = [];

    let i = 1;

    for (const command of arr) {
        if (command === "add") {
            result.push(i);
        }
        else {
            result.pop();
        }

        i++;
    }

    if (result.length === 0) {
        console.log("Empty");
        return;
    }

    console.log(result.join(' '));
}

addAndRemove(['add', 'add', 'add', 'add']);