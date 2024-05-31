function ladybugs(arr) {
    const n = parseInt(arr[0]);
    const initialIndexes = arr[1].split(' ').map(Number);
    const commands = arr.slice(2);

    let field = Array(n).fill(0);
    for (let index of initialIndexes) {
        if (index >= 0 && index < n) {
            field[index] = 1;
        }
    }

    for (let command of commands) {
        const [startIdxStr, direction, flyLengthStr] = command.split(' ');
        const startIdx = parseInt(startIdxStr);
        const flyLength = parseInt(flyLengthStr);

        if (startIdx < 0 || startIdx >= n || field[startIdx] === 0) {
            continue;
        }

        field[startIdx] = 0;
        let newIdx = startIdx;

        while (true) {
            if (direction === 'right') {
                newIdx += flyLength;
            } else if (direction === 'left') {
                newIdx -= flyLength;
            }

            if (newIdx < 0 || newIdx >= n) {
                break;
            }

            if (field[newIdx] === 0) {
                field[newIdx] = 1;
                break;
            }
        }
    }

    console.log(field.join(' '));
}

ladybugs([3, '0 1', '0 right 1', '2 right 1']);