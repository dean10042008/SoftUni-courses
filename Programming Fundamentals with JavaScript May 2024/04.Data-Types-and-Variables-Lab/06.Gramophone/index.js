function gramophone(band, album, song) {
    let duration = (album.length * band.length) * song.length / 2;
    let timesRotated = duration / 2.5;

    console.log(`The plate was rotated ${Math.ceil(timesRotated)} times.`)
}

gramophone('Black Sabbath', 'Paranoid', 'War Pigs');