function bookShelf(arr) {
    const result = {};

    for (const element of arr) {
        if (element.includes(" -> ")) {
            const [shelfId, shelfGenre] = element.split(" -> ");

            if (!(shelfId in result)) {
                result[shelfId] = [];
                result[shelfId].push(shelfGenre);
            }
        }
        else {
            const [title, rest] = element.split(": ");
            const [author, genre] = rest.split(", ");

            for (const resultKey in result) {
                if (result[resultKey][0] === genre) {
                    result[resultKey].push([title, author]);
                }
            }
        }
    }

    const entries = Object.entries(result);
    entries.sort((a, b) => {
        return b[1].length - a[1].length;
    })
    entries.forEach((row) => {
        const genre = row[1].shift();

        row[1].sort((a, b) => {
            return a[0].localeCompare(b[0]);
        })

        row[1].unshift(genre);
    });

    for (const entry of entries) {
        const shelfId = entry.shift();
        const shelfGenre = entry[0].shift();
        const booksCount = entry[0].length;

        console.log(`${shelfId} ${shelfGenre}: ${booksCount}`);

        entry[0].forEach(([title, author]) => {
            console.log(`--> ${title}: ${author}`);
        })
    }
}

bookShelf(['1 -> history', '1 -> action', 'Death in Time: Criss Bell, mystery', '2 -> mystery', '3 -> sci-fi', 'Child of Silver: Bruce Rich, mystery', 'Hurting Secrets: Dustin Bolt, action', 'Future of Dawn: Aiden Rose, sci-fi', 'Lions and Rats: Gabe Roads, history', '2 -> romance', 'Effect of the Void: Shay B, romance', 'Losing Dreams: Gail Starr, sci-fi', 'Name of Earth: Jo Bell, sci-fi', 'Pilots of Stone: Brook Jay, history']);