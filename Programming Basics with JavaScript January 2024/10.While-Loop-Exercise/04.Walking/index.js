function steps(input) {
    let totalSteps = 0;

    let i = 0;
    let command = input[i];
    i++;

    while (command !== "Going home") {
        let stepsWalked = Number(command);

        totalSteps += stepsWalked;

        if (totalSteps >= 10000) {
            console.log("Goal reached! Good job!");
            console.log(`${totalSteps - 10000} steps over the goal!`);
            break;
        }

        command = input[i];
        i++;
    }

    if (command === "Going home") {
        let stepsGoingHome = Number(input[i]);
        totalSteps += stepsGoingHome;

        if (totalSteps >= 10000) {
            console.log("Goal reached! Good job!");
            console.log(`${totalSteps - 10000} steps over the goal!`);
        }
        else {
            console.log(`${10000 - totalSteps} more steps to reach goal.`);
        }
    }

}

steps(["1000", "1500", "2000", "6500"]);