function carFactory(obj) {
    function determineEngine(minPower) {
        for (const engineTypesKey in engineTypes) {
            if (minPower <= engineTypesKey) {
                return engineTypesKey;
            }
        }
    }

    function determineWheelSize(current) {
        if (current % 2 !== 0) {
            return current;
        }

        const real = Math.floor(current - 1);
        return real;
    }

    const engineTypes = {
        90: 1800,
        120: 2400,
        200: 3500
    }

    let result = {};
    result.model = obj.model;

    const enginePower = determineEngine(obj.power);

    result.engine = {
        power: Number(enginePower),
        volume: engineTypes[enginePower]
    }

    result.carriage = {
        type: obj.carriage,
        color: obj.color,
    }

    const wheels = determineWheelSize(obj.wheelsize);

    result.wheels = [
        wheels,
        wheels,
        wheels,
        wheels
    ]

    // Should be returned, but I like to keep the console.log() instead.
    console.log(result);
}

carFactory({ model: 'VW Golf II', power: 90, color: 'blue', carriage: 'hatchback', wheelsize: 14 });