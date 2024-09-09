function circleArea(argument) {
    if (typeof argument !== 'number') {
        console.log(`We can not calculate the circle area, because we receive a ${typeof argument}.`);
        return;
    }

    const area = Math.PI * Math.pow(argument, 2);
    console.log(area.toFixed(2));
}

circleArea(5);