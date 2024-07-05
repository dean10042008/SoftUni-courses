function companyUsers(arr) {
    const result = {};

    arr.forEach(item => {
        const [company, id] = item.split(' -> ');

        if (!result[company]) {
            result[company] = new Set();
        }

        result[company].add(id);
    })

    const entries = Object.entries(result);

    entries.sort((a, b) => {
        return a[0].localeCompare(b[0]);
    });

    for (const combination of entries) {
        console.log(combination[0]);

        combination[1].forEach(item => {
            console.log(`-- ${item}`)
        })
    }
}

companyUsers(['SoftUni -> AA12345', 'SoftUni -> BB12345', 'Microsoft -> CC12345', 'HP -> BB12345']);