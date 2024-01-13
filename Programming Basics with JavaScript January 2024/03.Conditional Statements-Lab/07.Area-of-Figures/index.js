function area(arr) {
    let figure = arr[0];
    let area = 0;

    if (figure === 'square') {
        let a = arr[1];
        area = a * a;
        console.log(area);
    }
    else if (figure === 'rectangle') {
        let a = arr[1];
        let b = arr[2];
        area = a * b;
        console.log(area);
    }
    else if (figure === 'circle') {
        let radius = arr[1];
        area = (radius * radius) * Math.PI;
        console.log(area);
    }
    else {
        let a = arr[1];
        let h = arr[2];
        area = (a * h) / 2;
        console.log(area);
    }
}

area(['triangle', 4.5, 20]);