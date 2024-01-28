function lunch(arr) {
    let nameOfSerie = arr[0];
    let lenghtOfEp = Number(arr[1]);
    let lenghtOfBreak = Number(arr[2]);

    let timeToEat = lenghtOfBreak * (1 / 8);
    let timeToRest = lenghtOfBreak * (1 / 4);

    let timeLeft = lenghtOfBreak - timeToEat - timeToRest;
    
    if (timeLeft >= lenghtOfEp) {
        let difference = Math.ceil(timeLeft - lenghtOfEp);
        console.log(`You have enough time to watch ${nameOfSerie} and left with ${difference} minutes free time.`);
    }
    else {
        let difference = Math.ceil(lenghtOfEp - timeLeft);
        console.log(`You don't have enough time to watch ${nameOfSerie}, you need ${difference} more minutes.`);
    }
}

lunch(["Game of Thrones", "60", "96"]);

lunch(["Teen Wolf",
"48",
"60"])