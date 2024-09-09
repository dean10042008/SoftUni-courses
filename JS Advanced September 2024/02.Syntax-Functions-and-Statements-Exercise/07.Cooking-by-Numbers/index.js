function cookingByNumbers(initialNum, o1, o2, o3, o4, o5) {
    function chop(n) {
        return n / 2;
    }

    function dice(n) {
        return Math.sqrt(n);
    }

    function spice(n) {
        return n + 1;
    }

    function bake(n) {
        return n * 3;
    }

    function fillet(n) {
        return n * 0.8;
    }

    let commandsArr = [o1, o2, o3, o4, o5];
    let num = Number(initialNum);

    for (const command of commandsArr) {
        if (command === 'chop') {
            num = chop(num);
        }
        else if (command === 'dice') {
            num = dice(num);
        }
        else if (command === 'spice') {
            num = spice(num);
        }
        else if (command === 'bake') {
            num = bake(num);
        }
        else if (command === 'fillet') {
            num = fillet(num);
        }

        console.log(num);
    }
}

cookingByNumbers('32', 'chop', 'chop', 'chop', 'chop', 'chop');