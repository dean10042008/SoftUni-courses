function trekking(input) {
    let numberOfTrekkingGroups = Number(input[0]);

    let peopleTrekkingMusala = 0;
    let peopleTrekkingMonblan = 0;
    let peopleTrekkingKilimanjaro = 0;
    let peopleTrekkingK2 = 0;
    let peopleTrekkingEverest = 0;

    for (let i = 1; i <= numberOfTrekkingGroups; i++) {
        let numberOfPeopleInGroups = Number(input[i]);

        if (numberOfPeopleInGroups <= 5) {
            peopleTrekkingMusala += numberOfPeopleInGroups;
        }
        else if (numberOfPeopleInGroups <= 12) {
            peopleTrekkingMonblan += numberOfPeopleInGroups;
        }
        else if (numberOfPeopleInGroups <= 25) {
            peopleTrekkingKilimanjaro += numberOfPeopleInGroups;
        }
        else if (numberOfPeopleInGroups <= 40) {
            peopleTrekkingK2 += numberOfPeopleInGroups;
        }
        else {
            peopleTrekkingEverest += numberOfPeopleInGroups;
        }
    }
    let total = peopleTrekkingMusala + peopleTrekkingMonblan + peopleTrekkingKilimanjaro + peopleTrekkingK2 + peopleTrekkingEverest;
    
    console.log(`${((peopleTrekkingMusala / total) * 100).toFixed(2)}%`);
    console.log(`${((peopleTrekkingMonblan / total) * 100).toFixed(2)}%`);
    console.log(`${((peopleTrekkingKilimanjaro / total) * 100).toFixed(2)}%`);
    console.log(`${((peopleTrekkingK2 / total) * 100).toFixed(2)}%`);
    console.log(`${((peopleTrekkingEverest / total) * 100).toFixed(2)}%`);
}

trekking(["10", "10", "5", "1", "100", "12", "26", "17", "37", "40", "78"]);