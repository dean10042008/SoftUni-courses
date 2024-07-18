function race(arr) {
    let result = {};
    const names = arr.shift().split(', ');

    const numberPattern = /\d/;
    const capitalLetterPattern = /[A-Z]/;
    const smallLetterPattern = /[a-z]/;

    for (const name of names) {
        result[name] = 0;
    }

    let command = arr.shift();

    while (command !== "end of race") {
        let currentSum = 0;
        let currentName = '';

        const chars = command.split("");
        for (const char of chars) {
            if (numberPattern.test(char)) {
                currentSum += Number(char);
            }
            else if (capitalLetterPattern.test(char)) {
                currentName += char;
            }
            else if (smallLetterPattern.test(char)) {
                currentName += char;
            }
        }
        
        if (result.hasOwnProperty(currentName)) {
            result[currentName] += currentSum;
        }

        command = arr.shift();
    }

    let entries = Object.entries(result);
    entries.sort(([keyA, valueA], [keyB, valueB]) => valueB - valueA);

    console.log(`1st place: ${entries[0][0]}`)
    console.log(`2nd place: ${entries[1][0]}`)
    console.log(`3rd place: ${entries[2][0]}`)
}

race(['George, Peter, Bill, Tom', 'G4e@55or%6g6!68e!!@ ', 'R1@!3a$y4456@', 'B5@i@#123ll', 'G@e54o$r6ge#', '7P%et^#e5346r', 'T$o553m&6', 'end of race']);