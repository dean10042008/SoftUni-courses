function oldBook(input) {
    let bookesSearched = input[0];

    let i = 1;
    let command = input[i];

    let bookesChecked = 0;

    while (command !== "No More Books") {
        if (command === bookesSearched) {
            console.log(`You checked ${bookesChecked} books and found it.`);
            break;
        }

        bookesChecked++;

        i++;
        command = input[i];
    }

    if (command === "No More Books") {
        console.log('The book you search is not here!');
        console.log(`You checked ${bookesChecked} books.`);
    }
}

oldBook(["Troy", "Stronger", "Life Style", "Troy"]);