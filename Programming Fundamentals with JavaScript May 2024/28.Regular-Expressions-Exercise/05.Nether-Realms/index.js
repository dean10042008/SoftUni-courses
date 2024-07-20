function netherRealms(str) {
    const healthPattern = /[^\d+\-*\/.]/g;
    const catchNumbers = /-?\d+\.?\d*/g;

    const monsters = str.split(',').map(monster => monster.trim());
    monsters.sort((a, b) => a.localeCompare(b));

    for (let monster of monsters) {
        let hp = 0;
        let dmg = 0;

        // Calculate health
        const healthMatches = monster.match(healthPattern);
        if (healthMatches) {
            for (const char of healthMatches) {
                hp += char.charCodeAt(0);
            }
        }

        // Calculate base damage
        const damageMatches = monster.match(catchNumbers);
        if (damageMatches) {
            for (const match of damageMatches) {
                dmg += Number(match);
            }
        }

        // Apply multipliers and dividers
        for (const char of monster) {
            if (char === "*") {
                dmg *= 2;
            } else if (char === "/") {
                dmg /= 2;
            }
        }

        console.log(`${monster} - ${hp} health, ${dmg.toFixed(2)} damage`);
    }
}

netherRealms('M3ph-0.5s-0.5t0.0**');