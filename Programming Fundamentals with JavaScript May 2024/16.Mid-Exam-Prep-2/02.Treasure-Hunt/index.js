function treasureHunt(arr) {
    let treasureChest = arr.shift().split("|");

    let i = 0;
    let input = arr[i];
    i++;

    while (input !== "Yohoho!") {
        let tokens = input.split(" ");
        let command = tokens.shift();

        if (command === "Loot") {
            for (const token of tokens) {
                if (!treasureChest.includes(token)) {
                    treasureChest.unshift(token);
                }
            }
        }
        else if (command === "Drop") {
            let index = tokens.shift();
            if (index >= 0 && index < treasureChest.length - 1) {
                let removedItem = treasureChest.splice(index, 1);
                treasureChest.push(removedItem[0]);
            }
        }
        else if (command === "Steal") {
            let count = tokens.shift();
            let removed = treasureChest.splice(-count);
            console.log(removed.join(", "));
        }

        input = arr[i];
        i++;
    }

    if (treasureChest.length === 0) {
        console.log("Failed treasure hunt.");
        return;
    }

    let sumOfLengths = 0;

    for (let treasureChestElement of treasureChest) {
        sumOfLengths += treasureChestElement.length;
    }

    console.log(`Average treasure gain: ${(sumOfLengths / treasureChest.length).toFixed(2)} pirate credits.`);
}

treasureHunt(["Gold|Silver|Bronze|Medallion|Cup", "Loot Wood Gold Coins", "Loot Silver Pistol", "Drop 3", "Steal 3", "Yohoho!"]);