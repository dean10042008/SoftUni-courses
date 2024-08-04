function easterEggs(arr) {
    const regex = /[@#]+(?<color>[a-z]{3,})[@#]+[^a-z\d]*[\/]+(?<amount>\d+)[\/]+/g;
    const str = arr.shift();

    let match = regex.exec(str);

    while (match) {
        const {color, amount} = match.groups;
        console.log(`You found ${amount} ${color} eggs!`);

        match = regex.exec(str);
    }
}

easterEggs(['@@@@green@*/10/@yel0w@*26*#red#####//8//@limon*@*23*@@@red#*/%^&/6/@gree_een@/notnumber/###purple@@@@@*$%^&*/5/']);