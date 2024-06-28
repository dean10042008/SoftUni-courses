function inventory(arr) {
    class Hero {
        constructor(name, level, items) {
            this.name = name;
            this.level = level;
            this.items = items;
        }

        call() {
            console.log(`Hero: ${this.name}`);
            console.log(`level => ${this.level}`);
            console.log(`items => ${this.items}`);
        }
    }

    let sorted = arr.sort((a, b) => {
        const aTokens = a.split(" / ");
        const bTokens = b.split(" / ");
        return Number(aTokens[1]) - Number(bTokens[1]);
    });

    for (const hero of sorted) {
        const tokens = hero.split(" / ");
        let heroObj = new Hero(tokens[0], Number(tokens[1]), tokens[2]);
        heroObj.call();
    }
}

inventory(['Isacc / 25 / Apple, GravityGun', 'Derek / 12 / BarrelVest, DestructionSword', 'Hes / 1 / Desolator, Sentinel, Antara']);