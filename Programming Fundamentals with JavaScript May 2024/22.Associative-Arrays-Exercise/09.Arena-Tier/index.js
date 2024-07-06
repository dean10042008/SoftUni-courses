function arenaTier(arr) {
    let result = {};

    let command = arr.shift();

    while (command !== "Ave Cesar") {
        if (command.includes(" -> ")) {
            const [gladiator, technique, skill] = command.split(" -> ");

            if (!result.hasOwnProperty(gladiator)) {
                result[gladiator] = {};
            }

            if (!result[gladiator].hasOwnProperty(technique)) {
                result[gladiator][technique] = 0;
            }

            result[gladiator][technique] = Math.max(result[gladiator][technique], Number(skill));

        } else {
            const [glad1, glad2] = command.split(" vs ");
            if (result.hasOwnProperty(glad1) && result.hasOwnProperty(glad2)) {
                let commonTechnique = false;

                for (const technique in result[glad1]) {
                    if (result[glad2].hasOwnProperty(technique)) {
                        commonTechnique = true;
                        if (result[glad1][technique] > result[glad2][technique]) {
                            delete result[glad2];
                        } else if (result[glad1][technique] < result[glad2][technique]) {
                            delete result[glad1];
                        }
                        break;
                    }
                }
            }
        }

        command = arr.shift();
    }

    const entries = Object.entries(result).map(([gladiator, skills]) => {
        const totalSkill = Object.values(skills).reduce((acc, skill) => acc + skill, 0);
        return { gladiator, skills, totalSkill };
    });

    entries.sort((a, b) => b.totalSkill - a.totalSkill || a.gladiator.localeCompare(b.gladiator));

    for (const { gladiator, skills, totalSkill } of entries) {
        console.log(`${gladiator}: ${totalSkill} skill`);

        Object.entries(skills)
            .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
            .forEach(([technique, skill]) => {
                console.log(`- ${technique} <!> ${skill}`);
            });
    }
}

arenaTier(['Peter -> BattleCry -> 400', 'Alex -> PowerPunch -> 300', 'Stefan -> Duck -> 200', 'Stefan -> Tiger -> 250', 'Ave Cesar']);