function cake(input) {
    let width = Number(input[0]);
    let length = Number(input[1]);

    let totalPieces = width * length;

    let i = 2;
    let command = input[i];
    i++;

    while (command !== "STOP") {
        let cakeCount = Number(command);

        totalPieces -= cakeCount;

        if (totalPieces <= 0) {
            console.log(`No more cake left! You need ${Math.abs(totalPieces)} pieces more.`);
            break;
        }

        command = input[i];
        i++;
    }

    if (command === "STOP") {
        console.log(`${totalPieces} pieces are left.`);
    }
}

cake(["10", "10", "20", "20", "20", "20", "21"]);