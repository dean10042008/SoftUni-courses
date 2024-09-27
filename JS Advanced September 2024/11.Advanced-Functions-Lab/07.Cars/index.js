function cars(arr) {
    let result = {};

    const commands = {
        create: (name, inherits, parentName) => {
            result[name] = inherits ? Object.create(result[parentName]) : {};
        },
        set: (name, key, value) => {
            result[name][key] = value;
        },
        print: (name) => {
            const entries = [];
            for (let key in result[name]) {
                entries.push(`${key}:${result[name][key]}`);
            }
            console.log(entries.join(','));
        }
    };

    arr.forEach(commandLine => {
        const [command, name, action, secondArg] = commandLine.split(' ');

        if (command === 'create') {
            commands.create(name, action === 'inherit', secondArg);
        } else if (command === 'set') {
            commands.set(name, action, secondArg);
        } else if (command === 'print') {
            commands.print(name);
        }
    });
}

cars(['create c1', 'create c2 inherit c1', 'set c1 color red', 'set c2 model new', 'print c1', 'print c2']);