function rectangle(width, height, color) {
    const obj = {
        width,
        height,
        "color": color[0].toUpperCase() + color.slice(1),

        calcArea: function () {
            return this.width * this.height;
        }
    }

    return obj;
}

let rect = rectangle(4, 5, 'red');
console.log(rect.width);
console.log(rect.height);
console.log(rect.color);
console.log(rect.calcArea());