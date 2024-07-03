function meetings(arr) {
    let result = {};

    for (const appointment of arr) {
        const [day, name] = appointment.split(' ');

        if (result.hasOwnProperty(day)) {
            console.log(`Conflict on ${day}!`);
        }
        else {
            console.log(`Scheduled for ${day}`);
            result[day] = name;
        }
    }

    for (const day in result) {
        console.log(`${day} -> ${result[day]}`);
    }
}

meetings(['Monday Peter', 'Wednesday Bill', 'Monday Tim', 'Friday Tim']);