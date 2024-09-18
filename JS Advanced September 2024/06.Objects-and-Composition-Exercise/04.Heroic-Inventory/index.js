function heroicInventory(arr) {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
        const heroEl = arr[i];

        let currentRes = {};
        const [name, level, items] = heroEl.split(' / ');

        currentRes.name = name;
        currentRes.level = Number(level);
        currentRes.items = items ? String(items).split(', ') : [];

        result.push(currentRes);
    }

    // Should be returned, but I like to keep the console.log() instead.
    console.log(JSON.stringify(result));
}

heroicInventory(['Isacc / 25 / Apple, GravityGun', 'Derek / 12 / BarrelVest, DestructionSword', 'Hes / 1 / Desolator, Sentinel, Antara']);