function trainTheTrainers(input) {
    let judgeCount = Number(input[0]);

    let i = 1;
    let command = input[i];
    i++;

    let totalGradeSum = 0;
    let totalGradeCount = 0;

    while (command !== "Finish") {
        let presentationName = command;
        let presentationGradeSum = 0;

        for (let curJudge = 1; curJudge <= judgeCount; curJudge++) {
            let grade = Number(input[i]);
            i++;

            presentationGradeSum += grade;
        }

        let avgPresentationGrade = presentationGradeSum / judgeCount;

        totalGradeSum += avgPresentationGrade;
        totalGradeCount++;

        console.log(`${presentationName} - ${avgPresentationGrade.toFixed(2)}.`);

        command = input[i];
        i++;
    }

    console.log(`Student's final assessment is ${(totalGradeSum / totalGradeCount).toFixed(2)}.`);
}

trainTheTrainers(["2", "While-Loop", "6.00", "5.50", "For-Loop", "5.84", "5.66", "Finish"]);