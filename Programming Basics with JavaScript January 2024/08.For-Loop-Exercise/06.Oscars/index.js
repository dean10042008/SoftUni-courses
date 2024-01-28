function oscars(input) {
    let nameOfActor = input[0];
    let academyPoints = Number(input[1]);
    let juryCount = Number(input[2]);

    let juryPoints = 0;

    for (let i = 3; i < input.length; i+=2) {

        let nameOfJury = input[i];
        let pointsPerJury = input[i + 1];
        juryPoints += ((nameOfJury.length) * pointsPerJury) / 2;

        if ((juryPoints + academyPoints) >= 1250.5) {
            console.log(`Congratulations, ${nameOfActor} got a nominee for leading role with ${(juryPoints + academyPoints).toFixed(1)}!`);
            return;
        }
    }

    let totalPoints = juryPoints + academyPoints;

    if (totalPoints < 1250.5) {
        console.log(`Sorry, ${nameOfActor} you need ${(1250.5 - totalPoints).toFixed(1)} more!`);
    }
}

oscars(["Zahari Baharov", "205", "4", "Johnny Depp", "45", "Will Smith", "29", "Jet Lee", "10", "Matthew Mcconaughey", "39"]);