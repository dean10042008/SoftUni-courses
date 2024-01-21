function onTime(x) {
    let examHour = Number(x[0]);
    let examMin = Number(x[1]);
    let arrHour = Number(x[2]);
    let arrMin = Number(x[3]);
    if (examHour === 0) {
        examHour = 24
    };
    let time = examHour * 60 + examMin;
    let ontimes = arrHour * 60 + arrMin;
    if (ontimes > time) {
        if (Math.floor((ontimes - time) / 60 >= 1)) {
            if ((ontimes - time) % 60 > 10) {
                console.log(`Late`);
                console.log(`${Math.floor((ontimes - time) / 60)}:${(ontimes - time) % 60} hours after the start`);
            } else {
                console.log(`Late`);
                console.log(`${Math.floor((ontimes - time) / 60)}:0${(ontimes - time) % 60} hours after the start`);
            }
        } else {
            console.log(`Late`);
            console.log(`${ontimes - time} minutes after the start`);
        }
    } else if (ontimes < time) {
        if ((time - ontimes) <= 30) {
            console.log(`On time`);
            console.log(`${time - ontimes} minutes before the start`);
        } else if ((time - ontimes) >= 60) {
            if ((time - ontimes) % 60 > 10) {
                console.log(`Early`);
                console.log(`${Math.floor((time - ontimes) / 60)}:${(time - ontimes) % 60} hours before the start`);
            } else {
                console.log(`Early`);
                console.log(`${Math.floor((time - ontimes) / 60)}:0${(time - ontimes) % 60} hours before the start`);
            }
        } else {
            if ((time - ontimes) % 60 > 10) {
                console.log(`Early`);
                console.log(`${(time - ontimes) % 60} minutes before the start`);
            } else {
                console.log(`Early`);
                console.log(`0${(time - ontimes) % 60} minutes before the start`);
            }
        }
    } else {
        console.log(`On time`);
    }
}

onTime(["9", "30", "9", "50"]);

onTime(["9",
"00",
"8",
"30"])