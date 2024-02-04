function moving(input) {
    let width = Number(input[0]);
    let length = Number(input[1]);
    let height = Number(input[2]);

    let totalVolume = width * length * height;

    let i = 3;
    let command = input[i];
    i++;

    while (command !== "Done") {
        let boxesCount = Number(command);

        totalVolume -= boxesCount;

        if (totalVolume <= 0) {
            console.log(`No more free space! You need ${Math.abs(totalVolume)} Cubic meters more.`);
            break;
        }

        command = input[i];
        i++;
    }

    if (command === "Done") {
        console.log(`${totalVolume} Cubic meters left.`);
    }
}

moving(["10", "10", "2", "20", "20", "20", "20", "122"]);