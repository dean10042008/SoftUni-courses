function factory(library, orders) {
    let result = [];

    for (const order of orders) {
        let currentResult = {};

        const template = order.template;

        for (const templateKey in template) {
            currentResult[templateKey] = template[templateKey];
        }

        const commands = order.parts;

        for (const command of commands) {
            currentResult[command] = library[command];
        }

        result.push(currentResult);
    }

    return result;
}

const library = {
    print: function () {
        console.log(`${this.name} is printing a page`);
    },
    scan: function () {
        console.log(`${this.name} is scanning a document`);
    },
    play: function (artist, track) {
        console.log(`${this.name} is playing '${track}' by ${artist}`);
    },
};
const orders = [
    {
        template: { name: 'ACME Printer' },
        parts: ['print']
    },
    {
        template: { name: 'Initech Scanner'},
        parts: ['scan']
    },
    {
        template: { name: 'ComTron Copier'},
        parts: ['scan', 'print']
    },
    {
        template: { name: 'BoomBox Stereo'},
        parts: ['play']
    }
];
const products = factory(library, orders);
console.log(products);
