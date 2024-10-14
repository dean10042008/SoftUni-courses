class InventoryManagement {
    constructor(capacity) {
        this.capacity = capacity;
        this.items = [];
        this.outOfStock = [];
        this.itemsAsObj = {};
    }

    addItem(name, quantity) {
        if (quantity <= 0) {
            throw new Error("Quantity must be greater than zero.");
        }
        if (this.items.length >= this.capacity) {
            throw new Error("The inventory is already full.");
        }

        if (name in this.itemsAsObj) {
            this.itemsAsObj[name] += quantity;
        }
        else {
            this.itemsAsObj[name] = quantity;
        }

        this.items = Object.entries(this.itemsAsObj);
        return `Added ${quantity} ${name}(s) to the inventory.`;
    }

    sellItem(name, quantity) {
        if (quantity <= 0) {
            throw new Error("Quantity must be greater than zero.");
        }
        if (! (name in this.itemsAsObj)) {
            throw new Error(`The item ${name} is not available in the inventory.`);
        }
        if (this.itemsAsObj[name] < quantity) {
            throw new Error(`Not enough ${name}(s) in stock.`);
        }

        this.itemsAsObj[name] -= quantity;

        if (this.itemsAsObj[name] <= 0) {
            delete this.itemsAsObj[name];
            this.outOfStock.push(name);
        }

        this.items = Object.entries(this.itemsAsObj);
        return `Sold ${quantity} ${name}(s) from the inventory.`;
    }

    restockItem(name, quantity) {
        if (quantity <= 0) {
            throw new Error("Quantity must be greater than zero.");
        }

        if (name in this.itemsAsObj) {
            this.itemsAsObj[name] += quantity;
        }
        else {
            this.itemsAsObj[name] = quantity;
        }

        if (this.outOfStock.includes(name)) {
            const index = this.outOfStock.indexOf(name);
            this.outOfStock.splice(index, 1);
        }

        this.items = Object.entries(this.itemsAsObj);
        return `Restocked ${quantity} ${name}(s) in the inventory.`;
    }

    getInventorySummary() {
        let result = "";

        result += "Current Inventory:" + "\n";

        for (const [name, quantity] of this.items) {
            result += `${name}: ${quantity}` + "\n";
        }

        if (this.outOfStock.length) {
            let outOfStockLine = "";
            outOfStockLine += "Out of Stock: ";
            outOfStockLine += this.outOfStock.join(", ");
            result += outOfStockLine;
        }

        return result.trim();
    }
}

// const manager = new InventoryManagement(2);
// console.log(manager.addItem("Drill", 10));
// console.log(manager.addItem("Hammer", 5));
// console.log(manager.addItem("Level", 3));

// const manager = new InventoryManagement(3);
// console.log(manager.addItem("Drill", 10));
// console.log(manager.addItem("Hammer", 5));
// console.log(manager.addItem("Chisel", 3));
// console.log(manager.sellItem("Drill", 3)); 
// console.log(manager.sellItem("Paintbrush", 2));

// const manager = new InventoryManagement(3);
// console.log(manager.addItem("Drill", 10));
// console.log(manager.addItem("Hammer", 5));
// console.log(manager.addItem("Chisel", 3));
// console.log(manager.sellItem("Drill", 3)); 
// console.log(manager.restockItem("Drill", 5));
// console.log(manager.restockItem("Paintbrush", 1));

const manager = new InventoryManagement(3);
console.log(manager.addItem("Drill", 10));
console.log(manager.addItem("Hammer", 5));
console.log(manager.addItem("Chisel", 3));
console.log(manager.sellItem("Drill", 3));
console.log(manager.sellItem("Hammer", 5));
console.log(manager.restockItem("Drill", 5));
console.log(manager.restockItem("Paintbrush", 1));
console.log(manager.getInventorySummary());

// Added 10 Drill(s) to the inventory.
// Added 5 Hammer(s) to the inventory.
// Added 3 Chisel(s) to the inventory.
// Sold 3 Drill(s) from the inventory.
// Sold 5 Hammer(s) from the inventory.
// Restocked 5 Drill(s) in the inventory.
// Restocked 1 Paintbrush(s) in the inventory.
// Current Inventory:
// Drill: 12
// Chisel: 3
// Paintbrush: 1
// Out of Stock: Hammer