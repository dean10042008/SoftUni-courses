function areaAndVolumeCalculator(area, vol, input) {
    const arr = JSON.parse(input);

    let result = [];
    
    for (const element of arr) {
        let obj = {
            x: Number(element.x),
            y: Number(element.y),
            z: Number(element.z)
        }

        const areaRes = area.call(obj);
        const volRes = vol.call(obj);

        result.push(
            {
                area: areaRes,
                volume: volRes
            }
        );
    }

    // Should be returned, but I like to keep the console.log() instead.
    console.log(result);
}

function area() {
    return Math.abs(this.x * this.y);
}

function vol() {
    return Math.abs(this.x * this.y * this.z);
}

areaAndVolumeCalculator(area, vol, `[ {"x":"1","y":"2","z":"10"}, {"x":"7","y":"7","z":"10"}, {"x":"5","y":"2","z":"10"} ]`);