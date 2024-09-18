function createSortedList() {
    const obj = {
        res: [],
        size: 0,

        add: function (number) {
            if (typeof number === 'number') {
                this.res.push(number);
                this.size++;
                this.res.sort((a, b) => a - b);
            }
        },

        remove: function (index) {
            if (index >= 0 && index < this.res.length) {
                this.res.splice(index, 1);
                this.size--;
            }
        },

        get: function (index) {
            if (index >= 0 && index < this.res.length) {
                return this.res[index];
            }
        }
    }

    return obj;
}

let list = createSortedList();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1));
list.remove(1);
console.log(list.get(1));