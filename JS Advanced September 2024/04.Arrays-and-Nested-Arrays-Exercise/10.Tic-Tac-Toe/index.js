function ticTacToe(data) {
    function checkWinner(dashboard, marker) {
        for (let i = 0; i < dashboard.length; i++) {
            if (dashboard[i][0] === marker && dashboard[i][1] === marker && dashboard[i][2] === marker) {
                return true;
            }
            else if (dashboard[0][i] === marker && dashboard[1][i] === marker && dashboard[2][i] === marker) {
                return true;
            }
            else if (dashboard[0][0] === marker && dashboard[1][1] === marker && dashboard[2][2] === marker) {
                return true;
            }
            else if (dashboard[0][2] === marker && dashboard[1][1] === marker && dashboard[2][0] === marker) {
                return true;
            }
        }

        return false;
    }

    function checkForFreeSpace(dashboard) {
        return !dashboard.flat().filter(x => !x).length;
    }

    function printDashboard(dashboard) {
        dashboard.forEach(row => {
            console.log(row.join("\t"));
        });
    }


    let initialDashboard = [
        [false, false, false],
        [false, false, false],
        [false, false, false],
    ];

    let isFirstPlayer = true;

    for (let el of data) {
        let [x, y] = el.split(" ");

        if (initialDashboard[x][y]) {
            console.log("This place is already taken. Please choose another!");
            continue;
        }

        let marker = isFirstPlayer ? "X" : "O";

        initialDashboard[x][y] = marker;

        if (checkForFreeSpace(initialDashboard)) {
            console.log("The game ended! Nobody wins :(");
            return printDashboard(initialDashboard);
        }

        if (checkWinner(initialDashboard, marker)) {
            console.log(`Player ${marker} wins!`);
            return printDashboard(initialDashboard);
        }

        isFirstPlayer = !isFirstPlayer;
    }
}

ticTacToe(["0 1", "0 0", "0 2", "2 0", "1 0", "1 1", "1 2", "2 2", "2 1", "0 0"]);