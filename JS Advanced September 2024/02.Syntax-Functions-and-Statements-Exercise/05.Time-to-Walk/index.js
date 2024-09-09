function timeToWalk(steps, footprintLengthMeters, speed) {
    let distanceMeters = steps * footprintLengthMeters;

    let timeInSeconds = 0;

    const distanceKilos = distanceMeters / 1000;

    timeInSeconds += Math.floor(distanceMeters / 500) * 60;
    timeInSeconds += distanceKilos / speed * 3600;

    let timeHour = Math.floor(timeInSeconds / 3600);
    timeInSeconds -= timeHour * 3600;

    if (timeHour < 10) {
        timeHour = '0' + timeHour;
    }

    let timeMinutes = Math.floor(timeInSeconds / 60);
    timeInSeconds -= timeMinutes * 60;

    if (timeMinutes < 10) {
        timeMinutes = '0' + timeMinutes;
    }

    let timeSeconds = Math.round(timeInSeconds);

    if (timeSeconds < 10) {
        timeSeconds = '0' + timeSeconds;
    }

    console.log(`${timeHour}:${timeMinutes}:${timeSeconds}`);
}

timeToWalk(4000, 0.60, 5);