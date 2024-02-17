function easterCompetition(input) {
    let count = Number(input[0]);

    let result = 0;
    let highestPoints = 0;
    let nameWithMaxPoints = "";

    let index = 1;
    let command = input[index];

    for (let i = 1; i <= count; i++) {
        result = 0;

        let cookName = command;
        index++;

        while (command !== "Stop") {
            let current = Number(input[index]);
            result += current;

            index++;
            command = input[index];
        }
        console.log(`${cookName} has ${result} points.`);
        index++;
        command = input[index];

        if (result > highestPoints) {
            highestPoints = result;
            nameWithMaxPoints = cookName;
            console.log(`${cookName} is the new number 1!`);
        }
    }

    console.log(`${nameWithMaxPoints} won competition with ${highestPoints} points!`);
}

easterCompetition(["3", "Chef Manchev", "10", "10", "10", "10", "Stop", "Natalie", "8", "2", "9", "Stop", "George", "9", "2", "4", "2", "Stop"]);