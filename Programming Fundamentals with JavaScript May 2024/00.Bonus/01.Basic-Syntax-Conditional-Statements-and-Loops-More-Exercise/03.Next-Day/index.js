function nextDay(year, month, day) {
    let date = new Date(year, month - 1, day);
    date.setDate(date.getDate() + 1);
    date = date.toLocaleDateString();
    const [newMonth, newDay, newYear] = date.split("/");
    console.log(`${newYear}-${newMonth}-${newDay}`);
}

nextDay(2016, 9, 30);