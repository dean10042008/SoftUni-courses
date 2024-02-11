function easterCompetition(input) {
    let currentLine = 0;
    function readLine() {
        return input[currentLine++];
    }

    let count = parseInt(readLine());
    let bestBakerName = "";
    let bestBakerPoints = -1;

    for (let i = 0; i < count; i++) {
        let bakerName = readLine();
        let points = 0;
        let command = readLine();

        while (command !== "Stop") {
            points += parseInt(command);
            command = readLine();
        }

        console.log(`${bakerName} has ${points} points.`);

        if (points > bestBakerPoints) {
            bestBakerName = bakerName;
            bestBakerPoints = points;
            console.log(`${bakerName} is the new number 1!`);
        }
    }

    console.log(`${bestBakerName} won competition with ${bestBakerPoints} points!`);
}

easterCompetition(["3", "Chef Manchev", "10", "10", "10", "10", "Stop", "Natalie", "8", "2", "9", "Stop", "George", "9", "2", "4", "2", "Stop"]);