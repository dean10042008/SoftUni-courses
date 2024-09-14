function addAndRemoveElements(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        const command  = arr[i];

        switch (command) {
            case 'add':
                result.push(i + 1);
                break;
            case 'remove':
                result.pop();
                break;
        }
    }

    if (result.length === 0) {
        console.log("Empty");
        return;
    }

    console.log(result.join("\n"));
}

addAndRemoveElements(['add', 'add', 'add', 'add']);