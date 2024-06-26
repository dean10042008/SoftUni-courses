function cats(input) {
    class catClass {
        constructor(cat, age) {
            this.cat = cat;
            this.age = age;
        }

        meow(cat, age) {
            console.log(`${this.cat}, age ${this.age} says Meow`);
        }
    }

    for (const catEl of input) {
        const tokens = catEl.split(' ');

        let cat = new catClass(tokens[0], Number(tokens[1]));

        cat.meow();
    }
}

cats(['Mellow 2', 'Tom 5']);