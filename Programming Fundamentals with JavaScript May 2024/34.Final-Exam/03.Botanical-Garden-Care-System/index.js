function botanicialGardenCareSystem(arr) {
    let result = {};
    let sections = [];

    while (arr[0] !== "EndDay") {
        const tokens = arr.shift().split(": ");
        const [command, rest] = tokens;

        if (command === "Plant") {
            const [plantName, waterNeeded, section] = rest.split("-");

            if (plantName in result) {
                result[plantName][0] += Number(waterNeeded);
            }
            else {
                result[plantName] = [Number(waterNeeded), section];

                let index = sections.indexOf(section);

                if (index >= 0) {
                    sections[index + 1]++;
                }
                else {
                    sections.push(section, 1);
                }
            }
        }
        else {
            const [plantName, water] = rest.split("-");

            if (plantName in result) {
                result[plantName][0] -= Number(water);

                if (result[plantName][0] <= 0) {
                    console.log(`${plantName} has been sufficiently watered.`);
                    let index = sections.indexOf(result[plantName][1]);

                    if (sections[index + 1] === 1) {
                        sections.splice(index, 2);
                    }
                    else {
                        sections[index + 1]--;
                    }

                    delete result[plantName];
                }
            }
        }
    }

    console.log("Plants needing water:");

    for (const resultKey in result) {
        console.log(` ${resultKey} -> ${result[resultKey][0]}ml left`);
    }

    console.log("Sections with thirsty plants:");

    for (let i = 0; i < sections.length; i += 2) {
        console.log(` ${sections[i]}: ${sections[i + 1]}`);
    }
}

botanicialGardenCareSystem(["Plant: Orchid-300-TropicalZone", "Plant: Fern-200-FernGully", "Plant: Orchid-100-TropicalZone", "Water: Daisy-50", "Water: Orchid-400", "EndDay"]);