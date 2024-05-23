function centuriesToMinutes(century) {
    let year = century * 100;
    let day = year * 365.2422;
    day = Math.trunc(day);
    let hour = day * 24;
    let minute = hour * 60;

    console.log(`${century} centuries = ${year} years = ${day} days = ${hour} hours = ${minute} minutes`)
}

centuriesToMinutes(1);