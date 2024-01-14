function record(arr) {
    let recordTime = Number(arr[0]);
    let distance = Number(arr[1]);
    let hisBestTimeFor1m = Number(arr[2]);

    let hisRecord = distance * hisBestTimeFor1m;
    let timeWaterSlow = (Math.floor(distance / 15)) * 12.5;
    let hisBestTime = hisRecord + timeWaterSlow;

    if (hisBestTime > recordTime) {
        let difference = hisBestTime - recordTime;
        console.log(`No, he failed! He was ${difference.toFixed(2)} seconds slower.`);
    }
    else {
        console.log(`Yes, he succeeded! The new world record is ${hisBestTime.toFixed(2)} seconds.`);
    }
}

record(["55555.67", "3017", "5.03"])