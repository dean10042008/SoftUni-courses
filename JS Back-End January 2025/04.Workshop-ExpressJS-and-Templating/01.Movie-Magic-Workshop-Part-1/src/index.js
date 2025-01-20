import express from 'express';
import handlebars from 'express-handlebars';

const app = express();

const movies = [
    {
        id: "a3682672-0ee4-1284-8759-35ee253329zv",
        title: 'Jungle Cuise',
        genre: 'Adventure',
        description: 'Dreaming about saving countless lives and having another adventure, the feisty English feminist and doctor of botany, Dr Lily Houghton, embarks on a peril-laden mission to change the world. Along with her fashionable brother, MacGregor, Dr Houghton enlists the help of the arrogant, wisecracking riverboat skipper, Captain Frank Wolff, to guide them through the serpentine Amazon River in La Quila, his swift wooden boat. Now, as the intrepid trio ventures deeper and deeper into the heart of an impenetrable green maze, searching for something that cannot be found, a centuries-old curse and the ruthless aristocrat, Prince Joachim, threaten to put an end to their ambitious plans.',
        imageUrl: '/img/jungle-cruise.jpeg',
        director: 'Jaume Collet-Serra',
        year: '2021',
        rating: 6.6,
        category: 'movie',
    },
    {
        id: "z2682672-0ee4-1534-8759-35ee253329ty",
        title: 'Man of Steel',
        genre: 'Superhero',
        description: 'An alien child is evacuated from his dying world and sent to Earth to live among humans. His peace is threatened when other survivors of his home planet invade Earth.',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTk5ODk1NDkxMF5BMl5BanBnXkFtZTcwNTA5OTY0OQ@@._V1_FMjpg_UX1000_.jpg',
        director: 'Zack Snyder',
        year: '2013',
        rating: 7.1,
        category: 'movie',
    },
    {
        id: '81313c94-08e0-40bf-85bc-1e7cdeebbef9',
        title: 'Avengers: Endgame',
        category: 'movie',
        genre: 'Superhero',
        director: 'Anthony Russo',
        year: '2019',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg',
        rating: 8.4,
        description: "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe."
    }
];

// Config static middleware
app.use(express.static('../public'));

// Add handlebars engine to express engines
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));

// Set default engine
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.render("home", { movies });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/movies/:id/details", (req, res) => {
    const { id } = req.params;
    const movie = movies.find(movie => movie.id === id);
    res.render("details", { movie });
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.post("/create", (req, res) => {
    let data = "";

    req.on("data", (chunk) => {
        data += chunk;
    });

    req.on("end", () => {
        const { title, genre, description, imageUrl, director, year, rating, category } = JSON.parse(data);

        const newMovie = {
            title,
            genre,
            description,
            imageUrl,
            director,
            year,
            rating,
            category,
            id: crypto.randomUUID()
        };

        movies.push(newMovie);
        res.redirect("/");
        return res.end();
    });
});

app.get("/search", (req, res) => {
    res.render("search", { movies });
});

app.post("/search", (req, res) => {
    let data = "";

    req.on("data", (chunk) => {
        data += chunk;
    });

    req.on("end", () => {
        const searchParams = Object.fromEntries(new URLSearchParams(data));
        let filteredMovies = movies;
        
        if (searchParams.title !== "") {
            filteredMovies = filteredMovies.filter(movie => movie.title.toLowerCase().includes(searchParams.title.toLowerCase()));

            if (searchParams.genre === "" && searchParams.year === "") {
                res.render("search", { movies: filteredMovies, filter: searchParams });
            }
        }
        if (searchParams.genre !== "") {
            filteredMovies = filteredMovies.filter(movie => movie.genre.toLowerCase().includes(searchParams.genre.toLowerCase()));
            
            if (searchParams.title === "" && searchParams.year === "") {
                res.render("search", { movies: filteredMovies, filter: searchParams });
            }
        }
        if (searchParams.year !== "") {
            filteredMovies = filteredMovies.filter(movie => movie.year.toLowerCase().includes(searchParams.year.toLowerCase()));
            
            if (searchParams.title === "" && searchParams.genre === "") {
                res.render("search", { movies: filteredMovies, filter: searchParams });
            }
        }
        if (searchParams.title === "" && searchParams.genre === "" && searchParams.year === "") {
            res.render("search", { movies: filteredMovies, filter: searchParams });
        }

        res.render("search", { movies: filteredMovies, filter: searchParams });
    });
});

app.all("*", (req, res) => {
    res.render("404");
});

app.listen(5001, () => console.log("App is listening on http://localhost:5001..."));