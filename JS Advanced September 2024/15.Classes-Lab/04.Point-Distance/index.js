class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    };

    static distance(pointObj1, pointObj2) {
        return Math.sqrt(Math.pow(pointObj2.x - pointObj1.x, 2) + Math.pow(pointObj2.y - pointObj1.y, 2));
    }
}

let p1 = new Point(5, 5);
let p2 = new Point(9, 8);
console.log(Point.distance(p1, p2));