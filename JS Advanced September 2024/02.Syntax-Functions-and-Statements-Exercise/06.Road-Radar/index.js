function roadRadar(speed, area) {
    let speedLimits = {
        motorway: 130,
        interstate: 90,
        city: 50,
        residential: 20
    }

    let currentLimit = speedLimits[area];

    if (speed <= currentLimit) {
        console.log(`Driving ${speed} km/h in a ${currentLimit} zone`);
    }
    else {
        let status = '';
        const difference = speed - currentLimit;

        if (difference <= 20) {
            status = 'speeding';
        }
        else if (difference <= 40) {
            status = 'excessive speeding';
        }
        else {
            status = 'reckless driving';
        }

        console.log(`The speed is ${difference} km/h faster than the allowed speed of ${currentLimit} - ${status}`);
    }
}

roadRadar(40, 'city');