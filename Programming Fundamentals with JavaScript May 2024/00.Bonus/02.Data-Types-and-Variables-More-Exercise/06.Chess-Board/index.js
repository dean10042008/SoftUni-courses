function chessBoard(n) {
    let result = "";

    result += `<div class="chessboard">\n`;
    let color = "";

    for (let i = 1; i <= n; i++) {
        result += `\t<div>\n`;

        if (i % 2 !== 0) {
            color = "black";
        }
        else {
            color = "white";
        }

        for (let j = 1; j <= n; j++) {
            result += `\t\t<span class="${color}"></span>\n`;


            if (color === "black") {
                color = "white";
            }
            else {
                color = "black";
            }
        }

        result += `\t</div>\n`;
    }

    result += "</div>";

    console.log(result);
}

chessBoard(3);