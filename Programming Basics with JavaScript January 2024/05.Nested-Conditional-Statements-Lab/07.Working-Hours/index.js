function workHours(input) {
    let time = Number(input[0]);
    let day = input[1];

    if (day === 'Monday' || day === 'Tuesday' || day === 'Wednesday' || day === 'Thursday' || day === 'Friday' || day === 'Saturday') {
        if (time >= 10 && time <= 18) {
            console.log('open');
        }
        else {
            console.log('closed');  
        }
    }
    else {
        console.log('closed');  
    }
}

workHours(['19', 'Friday'])