function time(arr) {
    let hour = Number(arr[0]);
    let minute = Number(arr[1]);

    let newMin = minute + 15; // 59 + 15 = 74

    if (newMin >= 60) {
        newMin -= 60;
        let newHour = hour + 1;
        if (newHour === 24) {
            newHour = 0;
            // console.log(`${newHour}:${newMin}`);
        }
        if (newMin < 10) {
            console.log(`${newHour}:0${newMin}`);
        }
        else {
            console.log(`${newHour}:${newMin}`);
        }
        
    }
    else {
        console.log(`${hour}:${newMin}`);
    }
}

time(['12', '55'])