function gladiatorInventory(arr) {
    let inventory = arr.shift().split(" ");

    for (const command of arr) {
        let tokens = command .split(" ");
        const action = tokens[0];
        const equipment = tokens[1];

        if (action === "Buy") {
            if (!inventory.includes(equipment)) {
                inventory.push(equipment);
            }
        }
        else if (action === "Trash") {
            const equipmentIdx = inventory.indexOf(equipment);

            if (equipmentIdx !== -1) {
                inventory.splice(equipmentIdx, 1);
            }
        }
        else if (action === "Repair") {
            const equipmentIdx = inventory.indexOf(equipment);

            if (equipmentIdx !== -1) {
                inventory.splice(equipmentIdx, 1);
                inventory.push(equipment);
            }
        }
        else {
            const equipmentTokens = equipment.split("-");
            const equipmentNeeded = equipmentTokens[0];
            const upgrade = equipmentTokens[1];

            const equipmentIdx = inventory.indexOf(equipmentNeeded);

            if (equipmentIdx !== -1) {
                inventory.splice(equipmentIdx + 1, 0, `${equipmentNeeded}:${upgrade}`);
            }
        }
    }

    console.log(inventory.join(" "));
}

gladiatorInventory(['SWORD Shield Spear', 'Buy Bag', 'Trash Shield', 'Repair Spear', 'Upgrade SWORD-Steel']);