function tennis(input) {
    let tournamentCount = Number(input[0]);
    let initialPoints =  Number(input[1]);

    let seasonPoints = 0;
    let tournamentsWon = 0;

    for (let i = 0; i < tournamentCount + 2; i++) {
        let result = input[i];

        switch (result) {
            case 'W':
                seasonPoints += 2000;
                tournamentsWon++;
                break;
            
            case 'F':
                seasonPoints += 1200;
                break;
            
            case 'SF':
                seasonPoints += 720;
                break;
        }
    }

    console.log(`Final points: ${initialPoints + seasonPoints}`);
    console.log(`Average points: ${Math.floor(seasonPoints / tournamentCount)}`);
    console.log(`${((tournamentsWon / tournamentCount) * 100).toFixed(2)}%`);
}

tennis(["5", "1400", "F", "SF", "W", "W", "SF"]);