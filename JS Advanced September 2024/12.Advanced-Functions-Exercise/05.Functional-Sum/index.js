function add(a) {
    let sum = a;

    function inner(b) {
        sum += b;
        return inner;
    }

    inner.valueOf = function() {
        return sum;
    };

    return inner;
}

console.log(add(1)(6)(-3).valueOf());