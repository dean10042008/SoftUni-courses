function songs(arr) {
    const typeSong = arr.pop();
    const songsCount = arr.shift();
    let songs = [];

    class songClass {
        constructor(type, name, time) {
            this.type = type;
            this.name = name;
            this.time = time;
        }
    }

    for (let i = 0; i < songsCount; i++) {
        let [type, name, time] = arr[i].split("_");

        let song = new songClass(type, name, time);
        songs.push(song);
    }

    if (typeSong === "all") {
        songs.forEach(song => {
            console.log(song.name);
        })
    }
    else {
        let filtered = songs.filter(i => {
            return i.type === typeSong;
        })

        filtered.forEach(song => {
            console.log(song.name);
        })
    }
}

songs([3, 'favourite_DownTown_3:14', 'favourite_Kiss_4:16', 'favourite_Smooth Criminal_4:01', 'favourite']);