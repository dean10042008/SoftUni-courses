function stringLength(str1, str2, str3) {
    const stringLengthTotal = str1.length + str2.length + str3.length;
    console.log(stringLengthTotal);
    console.log(Math.floor(stringLengthTotal / 3));
}

stringLength('chocolate', 'ice cream', 'cake');