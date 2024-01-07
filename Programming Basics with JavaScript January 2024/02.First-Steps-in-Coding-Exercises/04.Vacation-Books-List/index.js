function findTheTime(arr) {
    let pagesInTotal = arr[0];
    let pagesInAnHour = arr[1];
    let daysToRead = arr[2];
    
    let hoursToSpend = pagesInTotal / pagesInAnHour;
    let hoursPerDay = hoursToSpend / daysToRead;

    console.log(hoursPerDay);
}

findTheTime([432, 15, 4]);