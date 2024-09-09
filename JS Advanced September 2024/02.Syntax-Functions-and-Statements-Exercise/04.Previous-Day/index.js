function previousDay(year, month, day) {
    let date = new Date(year, month - 1, day);
    date.setDate(date.getDate() - 1);
    date = date.toLocaleString().split(', ')[0];
    const [newMonth, newDay, newYear] = date.split('/');

    console.log(`${newYear}-${newMonth}-${newDay}`);
}

previousDay(2016, 9, 30);