function distanceBetweenPoint(x1, y1, x2, y2) {
    if (x1 < 0) {
        x1 = Math.abs(x1);
    }
    if (y1 < 0) {
        y1 = Math.abs(y1);
    }

    const result = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    console.log(result);
}

distanceBetweenPoint(2, 4, 5, 0);