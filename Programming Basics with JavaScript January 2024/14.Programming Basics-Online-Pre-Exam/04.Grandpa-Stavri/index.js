function grandpaStavri(input) {
    let days = Number(input[0]);

    let letersInTotal = 0;
    let degreesInTotal = 0;

    for (let i = 1; i < input.length; i += 2) {
        let leters = Number(input[i]);
        let degrees = Number(input[i + 1]);
        
        letersInTotal += leters;
        degreesInTotal += degrees * leters;
    }

    let avgDegree = degreesInTotal / letersInTotal;

    console.log(`Liter: ${letersInTotal.toFixed(2)}`);
    console.log(`Degrees: ${avgDegree.toFixed(2)}`);

    if (avgDegree < 38) {
        console.log("Not good, you should baking!");
    }
    else if (avgDegree <= 42) {
        console.log("Super!");
    }
    else {
        console.log("Dilution with distilled water!");
    }
}

grandpaStavri(["3", "100", "45", "50", "55", "150", "36"]);