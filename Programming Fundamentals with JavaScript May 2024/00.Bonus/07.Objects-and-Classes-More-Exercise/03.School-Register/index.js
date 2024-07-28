function schoolRegister(arr) {
    const result = {};

    for (const arrElement of arr) {
        const [snCombo, gradeCombo, scoreCombo] = arrElement.split(', ');
        const name = snCombo.split(': ')[1];
        const grade = Number(gradeCombo.split(': ')[1]) + 1;
        const averageScore = Number(scoreCombo.split(': ')[1]).toFixed(2);

        if (averageScore >= 3) {
            if (grade in result) {
                result[grade].students.push(name);
                result[grade].grade.push(Number(averageScore));
            }
            else {
                result[grade] = {"students": [name], "grade": [Number(averageScore)]};
            }
        }
    }

    const entries = Object.entries(result);
    entries.sort((a, b) => {
        Number(b[0]) - Number(a[0]);
    });

    for (const entry of entries) {
        console.log(`${entry[0]} Grade`);
        console.log(`List of students: ${entry[1].students.join(", ")}`);
        let sum = 0;

        entry[1].grade.forEach(item => {
            sum += item;
        })

        console.log(`Average annual score from last year: ${(sum / entry[1].grade.length).toFixed(2)}`);

        console.log();
    }
}

schoolRegister(["Student name: Mark, Grade: 8, Graduated with an average score: 4.75", "Student name: Ethan, Grade: 9, Graduated with an average score: 5.66", "Student name: George, Grade: 8, Graduated with an average score: 2.83", "Student name: Steven, Grade: 10, Graduated with an average score: 4.20", "Student name: Joey, Grade: 9, Graduated with an average score: 4.90", "Student name: Angus, Grade: 11, Graduated with an average score: 2.90", "Student name: Bob, Grade: 11, Graduated with an average score: 5.15", "Student name: Daryl, Grade: 8, Graduated with an average score: 5.95", "Student name: Bill, Grade: 9, Graduated with an average score: 6.00", "Student name: Philip, Grade: 10, Graduated with an average score: 5.05", "Student name: Peter, Grade: 11, Graduated with an average score: 4.88", "Student name: Gavin, Grade: 10, Graduated with an average score: 4.00"]);