function dayOfWeek(day) {
    let daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    switch (day) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
            console.log(daysOfWeek[day - 1]);
            break;
        default:
            console.log("Invalid day!");
            break;
    }
}

dayOfWeek(3);