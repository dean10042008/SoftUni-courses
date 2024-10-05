function juiceFlavors(arr) {
    class Fruit {
        constructor() {
            this.obj = {};
            this.fruits = new Set();
        };

        addProduct(fruit, quantity) {
            if (fruit in this.obj) {
                this.obj[fruit] += quantity;
            }
            else {
                this.obj[fruit] = quantity;
            }

            if (this.obj[fruit] >= 1000) {
                this.fruits.add(fruit);
            }
        };
    }

    let ref = new Fruit();

    for (const element of arr) {
        const [fruit, quantity] = element.split(" => ");
        ref.addProduct(fruit, Number(quantity));
    }

    const result = ref.obj;
    const fruits = Array.from(ref.fruits);
    
    for (const fruit of fruits) {
        console.log(`${fruit} => ${Math.floor(result[fruit] / 1000)}`);
    }
}

juiceFlavors(['Orange => 2000', 'Peach => 1432', 'Banana => 450', 'Peach => 600', 'Strawberry => 549']);