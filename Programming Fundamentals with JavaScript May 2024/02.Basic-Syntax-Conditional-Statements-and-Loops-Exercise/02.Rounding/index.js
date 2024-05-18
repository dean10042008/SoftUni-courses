function rounding(number, decimals) {
    if (decimals <= 15) {
        console.log(parseFloat(number.toFixed(decimals)));
    }
    else {
        console.log(parseFloat(number.toFixed(15)));
    }
}

rounding(3.1415926535897932384626433832795,2);