function createComputerHierarchy() {
    class Keyboard {
        constructor(manufacturer, responseTime) {
            this.manufacturer = manufacturer;
            this.responseTime = responseTime;
        }
    }

    class Monitor {
        constructor(manufacturer, width, height) {
            this.manufacturer = manufacturer;
            this.width = width;
            this.height = height;
        }
    }

    class Battery {
        constructor(manufacturer, expectedLife) {
            this.manufacturer = manufacturer;
            this.expectedLife = expectedLife;
        }
    }

    class Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
            if (new.target === Computer) {
                throw new Error("Class Computer must not be instanced directly");
            }
            else {
                this.manufacturer = manufacturer;
                this.processorSpeed = processorSpeed;
                this.ram = ram;
                this.hardDiskSpace = hardDiskSpace;
            }
        }
    }

    class Laptop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);

            if (!(battery instanceof Battery)) {
                throw new TypeError("Battery property should be an instance of the Battery Class!");
            }

            this.weight = weight;
            this.color = color;
            this._battery = battery;
        }

        get battery() {
            return this._battery;
        }

        set battery(newBattery) {
            if (!(newBattery instanceof Battery)) {
                throw new TypeError("Battery property should be an instance of the Battery Class!");
            }

            this._battery = newBattery;
        }
    }

    class Desktop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);

            if (!(keyboard instanceof Keyboard)) {
                throw new TypeError("Keyboard property should be an instance of the Keyboard Class!");
            }
            if (!(monitor instanceof Monitor)) {
                throw new TypeError("Monitor property should be an instance of the Monitor Class!");
            }

            this._keyboard = keyboard;
            this._monitor = monitor;
        }

        get keyboard() {
            return this._keyboard;
        }

        set keyboard(newKeyboard) {
            if (!(newKeyboard instanceof Keyboard)) {
                throw new TypeError("Keyboard property should be an instance of the Keyboard Class!");
            }

            this._keyboard = newKeyboard;
        }

        get monitor() {
            return this._monitor;
        }

        set monitor(newMonitor) {
            if (!(newMonitor instanceof Monitor)) {
                throw new TypeError("Monitor property should be an instance of the Monitor Class!");
            }

            this._monitor = newMonitor;
        }
    }

    return {
        Keyboard,
        Monitor,
        Battery,
        Computer,
        Laptop,
        Desktop
    }
}

let classes = createComputerHierarchy();
let Computer = classes.Computer;
let Laptop = classes.Laptop;
let Desktop = classes.Desktop;
let Monitor = classes.Monitor;
let Battery = classes.Battery;
let Keyboard = classes.Keyboard;
let battery = new Battery('Energy', 3);
console.log(battery);
let laptop = new Laptop("Hewlett Packard", 2.4, 4, 0.5, 3.12, "Silver", battery);
console.log(laptop);