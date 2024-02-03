function marks(input) {
    let name = input[0];
    let grade = 1;
    let current = Number(input[grade]);
    let gradesSum = 0;
    let excluded = 0;

    while (grade <= 12) {
        if (current < 4) {
            excluded++;
        }
        if (excluded > 1) {
            console.log(`${name} has been excluded at ${grade - 1} grade`);
            return;
        }

        gradesSum += current;

        grade++;
        current = Number(input[grade]);
    }
    console.log(`${name} graduated. Average grade: ${(gradesSum / 12).toFixed(2)}`);
}

marks(["Gosho", "5", "5.5", "6", "5.43", "5.5", "6", "5.55", "5", "6", "6", "5.43", "5"]);
marks(["Mimi", "5", "6", "5", "6", "5", "6", "6", "2", "3"]);