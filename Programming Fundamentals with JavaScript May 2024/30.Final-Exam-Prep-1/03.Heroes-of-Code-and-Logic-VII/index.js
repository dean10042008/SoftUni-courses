function heroesOfCodeAndLogicVII(arr) {
    if (arr.length === 0) return; // Early exit if no input

    const numberOfHeroes = Number(arr.shift());
    if (isNaN(numberOfHeroes) || numberOfHeroes <= 0) return; // Validate number of heroes

    const heroes = {};

    for (let i = 0; i < numberOfHeroes; i++) {
        const tokens = arr.shift().split(' ');
        if (tokens.length !== 3) continue; // Skip invalid hero data

        const name = tokens[0];
        const hp = Number(tokens[1]);
        const mp = Number(tokens[2]);

        if (isNaN(hp) || isNaN(mp) || hp < 0 || mp < 0) continue; // Validate HP and MP

        heroes[name] = { hp, mp };
    }

    let command = arr.shift();

    while (command !== "End" && command !== undefined) {
        const tokens = command.split(" - ");
        if (tokens.length < 3) continue; // Skip invalid commands

        const action = tokens[0];
        const name = tokens[1];

        if (!heroes[name]) {
            command = arr.shift();
            continue; // Skip actions for non-existent heroes
        }

        const hero = heroes[name];

        if (action === "CastSpell") {
            if (tokens.length < 4) continue; // Skip invalid CastSpell commands

            const mpNeeded = Number(tokens[2]);
            const spellName = tokens[3];

            if (isNaN(mpNeeded) || mpNeeded < 0) continue; // Validate MP needed

            if (hero.mp >= mpNeeded) {
                hero.mp -= mpNeeded;
                console.log(`${name} has successfully cast ${spellName} and now has ${hero.mp} MP!`);
            } else {
                console.log(`${name} does not have enough MP to cast ${spellName}!`);
            }
        } else if (action === "TakeDamage") {
            if (tokens.length < 4) continue; // Skip invalid TakeDamage commands

            const dmg = Number(tokens[2]);
            const attacker = tokens[3];

            if (isNaN(dmg) || dmg < 0) continue; // Validate damage

            if (hero.hp > dmg) {
                hero.hp -= dmg;
                console.log(`${name} was hit for ${dmg} HP by ${attacker} and now has ${hero.hp} HP left!`);
            } else {
                console.log(`${name} has been killed by ${attacker}!`);
                delete heroes[name];
            }
        } else if (action === "Recharge") {
            if (tokens.length < 3) continue; // Skip invalid Recharge commands

            let amount = Number(tokens[2]);

            if (isNaN(amount) || amount < 0) continue; // Validate recharge amount

            const oldMP = hero.mp;
            hero.mp = Math.min(hero.mp + amount, 200);

            console.log(`${name} recharged for ${hero.mp - oldMP} MP!`);
        } else if (action === "Heal") {
            if (tokens.length < 3) continue; // Skip invalid Heal commands

            let amount = Number(tokens[2]);

            if (isNaN(amount) || amount < 0) continue; // Validate heal amount

            const oldHP = hero.hp;
            hero.hp = Math.min(hero.hp + amount, 100);

            console.log(`${name} healed for ${hero.hp - oldHP} HP!`);
        }

        command = arr.shift();
    }

    for (const [name, { hp, mp }] of Object.entries(heroes)) {
        console.log(name);
        console.log(`  HP: ${hp}`);
        console.log(`  MP: ${mp}`);
    }
}

heroesOfCodeAndLogicVII(['2', "Solmyr 85 120", 'Kyrre 99 50', 'Heal - Solmyr - 10', 'Recharge - Solmyr - 50', 'TakeDamage - Kyrre - 66 - Orc', 'CastSpell - Kyrre - 15 - ViewEarth', 'End']);