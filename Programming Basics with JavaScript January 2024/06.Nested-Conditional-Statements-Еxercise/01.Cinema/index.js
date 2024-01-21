function cinema(input) {
    let movieType = input[0];
    let rows = Number(input[1]);
    let cols = Number(input[2]);

    let seats = rows * cols;
    let income = 0;

    switch (movieType) {
        case 'Premiere':
            income = seats * 12;
            break;
        case 'Normal':
            income = seats * 7.5;
            break;
        case 'Discount':
            income = seats * 5;
            break;
    }

    console.log(`${income.toFixed(2)} leva`);
}

cinema(["Premiere", "10", "12"])