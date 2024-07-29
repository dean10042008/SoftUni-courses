function softUniStudents(arr) {
    const courses = {};
    const result = {};

    for (const el of arr) {
        if (el.includes(": ")) {
            const [course, capacity] = el.split(": ");

            if (course in result) {
                result[course][0] += Number(capacity);
            }
            else {
                result[course] = [];
                result[course].push(Number(capacity));
            }
        }
        else {
            const [fp, lp] = el.split(" with email ");
            const [studentName, rest] = fp.split("[");
            const credits = rest.split("]")[0];
            const [email, courseName] = lp.split(" joins ");

            if (courseName in result && result[courseName][0] > 0) {
                result[courseName].push([credits, studentName, email]);

                result[courseName][0]--;
            }
        }
    }

    const entries = Object.entries(result);
    entries.sort((a, b) => {
        return b[1].length - a[1].length;
    })

    entries.forEach((row) => {
        const placesLeft = row[1].shift();
        row[1].sort((a, b) => {
            return Number(b[0]) - Number(a[0]);
        });

        row[1].unshift(placesLeft);
    })

    for (const entry of entries) {
        const course = entry.shift();
        const placesLeft = entry[0].shift();

        console.log(`${course}: ${placesLeft} places left`);

        for (const first of entry[0]) {
            console.log(`--- ${first[0]}: ${first[1]}, ${first[2]}`);
        }
    }
}

softUniStudents(['JavaBasics: 2', 'user1[25] with email user1@user.com joins C#Basics', 'C#Advanced: 3', 'JSCore: 4', 'user2[30] with email user2@user.com joins C#Basics', 'user13[50] with email user13@user.com joins JSCore', 'user1[25] with email user1@user.com joins JSCore', 'user8[18] with email user8@user.com joins C#Advanced', 'user6[85] with email user6@user.com joins JSCore', 'JSCore: 2', 'user11[3] with email user11@user.com joins JavaBasics', 'user45[105] with email user45@user.com joins JSCore', 'user007[20] with email user007@user.com joins JSCore', 'user700[29] with email user700@user.com joins JSCore', 'user900[88] with email user900@user.com joins JSCore']);