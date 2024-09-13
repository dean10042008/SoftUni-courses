function pieceOfPiece(arr, startEl, endEl) {
    const startIndex = arr.indexOf(startEl);
    const endIndex = arr.indexOf(endEl);

    const result = arr.slice(startIndex, endIndex + 1);
    // Should be returned, but I like to keep the console.log() instead.
    console.log(result);
}

pieceOfPiece(['Pumpkin Pie', 'Key Lime Pie', 'Cherry Pie', 'Lemon Meringue Pie', 'Sugar Cream Pie'], 'Key Lime Pie', 'Lemon Meringue Pie');