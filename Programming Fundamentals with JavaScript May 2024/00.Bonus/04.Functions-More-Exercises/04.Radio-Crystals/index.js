function radioCrystals(arr) {
    const targetThickness = arr[0];

    function performOperation(thickness, targetThickness, operationName, operationFunc, limit) {
        let count = 0;

        while ((limit ? count < limit : true) && canApplyOperation(thickness, targetThickness, operationFunc)) {
            thickness = operationFunc(thickness);
            count++;
        }

        if (count > 0) {
            console.log(`${operationName} x${count}`);
            if (operationName !== 'X-ray') {
                console.log('Transporting and washing');
                thickness = Math.floor(thickness);
            }
        }

        return thickness;
    }

    function canApplyOperation(thickness, targetThickness, operationFunc) {
        return operationFunc(thickness) >= targetThickness || (operationFunc === (x => x - 2) && Math.floor(operationFunc(thickness)) >= targetThickness);
    }

    for (let i = 1; i < arr.length; i++) {
        let thickness = arr[i];
        console.log(`Processing chunk ${thickness} microns`);

        thickness = performOperation(thickness, targetThickness, 'Cut', (x) => x / 4);
        thickness = performOperation(thickness, targetThickness, 'Lap', (x) => x * 0.8);
        thickness = performOperation(thickness, targetThickness, 'Grind', (x) => x - 20);
        thickness = performOperation(thickness, targetThickness, 'Etch', (x) => x - 2);

        // Check if we need to X-ray (only if thickness is one less than target)
        if (thickness + 1 === targetThickness) {
            thickness = performOperation(thickness, targetThickness, 'X-ray', (x) => x + 1, 1);
        }

        console.log(`Finished crystal ${thickness} microns`);
    }
}

radioCrystals([1375, 50000]);