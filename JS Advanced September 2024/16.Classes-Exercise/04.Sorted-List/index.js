class List {
    constructor() {
        this.items = [];
        this.size = 0;
    }

    add(num) {
        if (typeof num === 'number') {
            this.items.push(num);
            this.size++;
            this.items.sort((a, b) => a - b);
        }
    }

    remove(index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
            this.size--;
        }
    }

    get (index) {
        if (index >= 0 && index < this.items.length) {
            return this.items[index];
        }
    }
}

let list = new List();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1)); 
list.remove(1);
console.log(list.get(1));