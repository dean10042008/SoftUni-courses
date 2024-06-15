function arrayManipulator(nums, commands) {

    for (const command of commands) {
        let tokens = command.split(' ');
        const action = tokens.shift();

        if (action === 'add') {
            const index = Number(tokens.shift());
            const element = Number(tokens.shift());

            nums.splice(index, 0, element);
        }
        else if (action === 'addMany') {
            let index = Number(tokens.shift());

            for (let element of tokens) {
                element = Number(element);
                nums.splice(index, 0, element);
                index++;
            }
        }
        else if (action === 'contains') {
            const element = Number(tokens.shift());
            const elementIndex = nums.indexOf(element);
            console.log(elementIndex);
        }
        else if (action === 'remove') {
            const index = Number(tokens.shift());

            nums.splice(index, 1);
        }
        else if (action === 'shift') {
            const rotations = Number(tokens.shift());

            for (let rotation = 1; rotation <= rotations; rotation++) {
                const first = nums.shift();
                nums.push(first);
            }
        }
        else if (action === 'sumPairs') {
            let result = [];

            for (let i = 0; i < nums.length; i += 2) {
                 const current = nums[i];
                 const next = nums[i + 1];

                 if (next === undefined) {
                     result.push(current);
                 }
                 else {
                     result.push(current + next);
                 }
            }

            nums = result;
        }
        else {
            console.log(`[ ${nums.join(', ')} ]`);
            return;
        }
    }
}

arrayManipulator([1, 2, 4, 5, 6, 7], ['add 1 8', 'contains 1', 'contains 3', 'print']);