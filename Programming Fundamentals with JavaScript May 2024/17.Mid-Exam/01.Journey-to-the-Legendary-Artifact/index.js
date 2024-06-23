function journeyToTheLegendaryArtifact (arr) {
    let initialEnergy = Number(arr.shift());

    let i = 0;
    let command = arr[i];
    i++;

    let mountainCount = 0;
    let artifactCount = 0;

    while (command !== "Journey ends here!") {
        if (command === "mountain") {
            mountainCount++;
            initialEnergy -= 10;

            if (mountainCount % 3 === 0) {
                artifactCount++;
            }
        }
        else if (command === "desert") {
            initialEnergy -= 15;
        }
        else if (command === "forest") {
            initialEnergy += 7;
        }

        if (artifactCount === 3) {
            console.log(`The character reached the legendary artifact with ${initialEnergy.toFixed(2)} energy left.`);
            return;
        }

        if (initialEnergy <= 0) {
            console.log("The character is too exhausted to carry on with the journey.");
            return;
        }


        command =arr[i];
        i++;
    }

    console.log(`The character could not find all the pieces and needs ${3 - artifactCount} more to complete the legendary artifact.`);
}

journeyToTheLegendaryArtifact(["130.0", "mountain", "desert", "mountain", "forest", "mountain", "desert", "desert", "mountain", "mountain", "desert", "mountain", "forest", "mountain", "mountain", "forest", "mountain", "Journey ends here!"]);