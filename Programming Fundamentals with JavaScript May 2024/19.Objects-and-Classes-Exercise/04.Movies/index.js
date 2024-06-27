function movies(arr) {
    let result = [];

    arr.forEach((command) => {
        if (command.startsWith("addMovie ")) {
            const movieName = command.substring(9);
            result.push({ name: movieName })
        }
        else if (command.includes(" directedBy ")) {
            const [movieName, director] = command.split(" directedBy ");

            const movie = result.find(movie => movie.name === movieName);
            if (movie) {
                movie.director = director;
            }
        }
        else if (command.includes(" onDate ")) {
            const [movieName, date] = command.split(" onDate ");
            const movie = result.find(movie => movie.name === movieName);

            if (movie) {
                movie.date = date;
            }
        }
    })

    for (const movie of result) {
        if (movie.name && movie.director && movie.date) {
            console.log(JSON.stringify(movie));
        }
    }
}

movies(['addMovie Fast and Furious', 'addMovie Godfather', 'Inception directedBy Christopher Nolan', 'Godfather directedBy Francis Ford Coppola', 'Godfather onDate 29.07.2018', 'Fast and Furious onDate 30.07.2018', 'Batman onDate 01.08.2018', 'Fast and Furious directedBy Rob Cohen']);