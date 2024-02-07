function fitness(input) {
    let visitors = Number(input[0]);

    let back = 0;
    let chest = 0;
    let legs = 0;
    let abs = 0;
    let proteinShake = 0;
    let proteinBar = 0;

    for (let i = 1; i < input.length; i++) {
        let word = input[i];

        if (word === "Back") {
            back++;
        }
        else if (word === "Chest") {
            chest++;
        }
        else if (word === "Legs") {
            legs++
        }
        else if (word === "Abs") {
            abs++;
        }
        else if (word === "Protein shake") {
            proteinShake++;
        }
        else if (word === "Protein bar") {
            proteinBar++;
        }
    }
    
    let totalTrain = back + chest + legs + abs;
    let totalBuying = proteinShake + proteinBar;

    console.log(`${back} - back`);
    console.log(`${chest} - chest`);
    console.log(`${legs} - legs`);
    console.log(`${abs} - abs`);
    console.log(`${proteinShake} - protein shake`);
    console.log(`${proteinBar} - protein bar`);
    console.log(`${((totalTrain / visitors) * 100).toFixed(2)}% - work out`);
    console.log(`${((totalBuying / visitors) * 100).toFixed(2)}% - protein`);
}

fitness(["10", "Back", "Chest", "Legs", "Abs", "Protein shake", "Protein bar", "Protein shake", "Protein bar", "Legs", "Abs"]);