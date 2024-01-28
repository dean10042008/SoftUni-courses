function time(arr) {
    let fnum = Number(arr[0]);
    let snum = Number(arr[1]);
    let tnum = Number(arr[2]);
    let totalTime = fnum + snum + tnum;

    let minutes = Math.floor(totalTime / 60);
    let seconds = totalTime % 60;

    if (seconds < 10) {
        console.log(`${minutes}:0${seconds}`);
    }
    else {
        console.log(`${minutes}:${seconds}`);
    }
}

time(['35', '45', '44']);