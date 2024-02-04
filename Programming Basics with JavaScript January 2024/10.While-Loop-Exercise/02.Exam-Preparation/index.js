function examPreparation(input) {
    let maxBadGrades = Number(input[0]);
    
    let i = 1;
    let command = input[i];
    i++;

    let grade = Number(input[i]);
    i++;

    let badGrades = 0;
    let gradesSum = 0;
    let gradesCount = 0;
    let lastProblem = '';

    while (command !== "Enough") {
        lastProblem = command;

        if (grade <= 4) {
            badGrades++;
        }

        if (badGrades === maxBadGrades) {
            console.log(`You need a break, ${badGrades} poor grades.`);
            break;
        }

        gradesCount++;
        gradesSum += grade;

        command = input[i];
        i++;

        grade = Number(input[i]);
        i++;
    }

    if (command === "Enough") {
        console.log(`Average score: ${(gradesSum / gradesCount).toFixed(2)}`);
        console.log(`Number of problems: ${gradesCount}`);
        console.log(`Last problem: ${lastProblem}`);
    }
}

examPreparation(["3", "Money", "6", "Story", "4", "Spring Time", "5", "Bus", "6", "Enough"]);