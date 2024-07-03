function schoolGrades(arr) {
    let result = {};

    for (const student of arr) {
        let tokens = student.split(" ");
        const name = tokens.shift();
        const grades = tokens.map(Number);

        if (result.hasOwnProperty(name)) {
            const old = result[name];

            grades.forEach((grade) => {
                old.push(grade);
            });

            result[name] = old;
        }
        else {
            result[name] = grades;
        }
    }

    let entries = Object.entries(result);

    entries.sort((a, b) => {
        const keyA = a[0];
        const keyB = b[0];

        return keyA.localeCompare(keyB);
    });

    for (const student of entries) {
        let sum = 0
        student[1].forEach((grade) => {
            sum += Number(grade);
        });
        const averageGrade = (sum / student[1].length).toFixed(2);

        console.log(`${student[0]}: ${averageGrade}`);
    }
}

schoolGrades(['Lilly 4 6 6 5', 'Tim 5 6', 'Tammy 2 4 3', 'Tim 6 6']);