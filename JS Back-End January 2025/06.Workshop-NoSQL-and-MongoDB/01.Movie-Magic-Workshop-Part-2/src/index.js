import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';

import Movie from './models/Movie.js';
import Cast from './models/Cast.js';

import { getAll } from './services/movie-service.js';
import { getAllCast } from './services/cast-service.js';

const uri = 'mongodb://0.0.0.0:27017/Movie-Magic';

try {
    await mongoose.connect(uri);
    console.log('Connected to DB Successfully');
} catch (err) {
    console.error('Cannot connect to DB!');
    console.log(err.message);
}

const app = express();

// Config static middleware
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));

// Add handlebars engine to express engines
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowedProtoMethodsByDefault: true
    }
}));

// Set default engine
app.set('view engine', 'hbs');

app.get('/', async (req, res) => {
    res.render("home", { movies: await getAll() });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/movies/:id/details", async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate("cast.castData");

    const casts = movie.cast;

    res.render("details", { movie, casts });
});

app.get("/createMovie", (req, res) => {
    res.render("create-movie");
});

app.post("/createMovie", async (req, res) => {
    const movieData = req.body;

    if (Object.values(movieData).filter(x => x === "").length !== 0) {
        return res.status(204).end("Bad Request.");
    }

    const newMovie = {
        title: movieData.title,
        genre: movieData.genre,
        description: movieData.description,
        imageUrl: movieData.imageUrl,
        director: movieData.director,
        year: Number(movieData.year),
        rating: Number(movieData.rating),
        category: movieData.category,
    };

    try {
        await Movie.create(newMovie);
        res.redirect("/");
    }
    catch (err) {
        console.error(err);
        return res.status(204).end("Bad Request.");
    }
});

app.get('/createCast', (req, res) => {
    res.render('create-cast');
});

app.post('/createCast', async (req, res) => {
    const castData = req.body;

    if (Object.values(castData).filter(x => x === "").length !== 0) {
        return res.status(204).end("Bad Request.");
    }

    try {
        await Cast.create(castData);
        res.redirect('/');
    }
    catch (err) {
        console.error(err);
        return res.status(204).end("Bad Request.");
    }
});

app.get('/movies/:id/attachCast', async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    const casts = await getAllCast({ exclude: movie.cast });

    res.render('attach-cast', { movie, casts });
});

app.post('/movies/:id/attachCast', async (req, res) => {
    if (req.body.cast === "" || req.body.character === "") {
        return res.status(204).end("Bad Request.");
    }

    const castId = req.body.cast;
    const character = req.body.character;
    const movieId = req.params.id;

    // * Way #1
    // const movie = await Movie.findById(movieId);
    // movie.cast.push(castId);
    // await movie.save();

    // * Way #2
    await Movie.findByIdAndUpdate(movieId, {
        $push: {
            cast: {
                castData: castId, character
            }
        }
    });

    res.redirect(`/movies/${movieId}/details`);
});

app.get("/search", async (req, res) => {
    res.render("search", { movies: await getAll() });
});

app.post("/search", async (req, res) => {
    const searchParams = req.body;

    let query = {};

    if (searchParams.title) {
        query.title = new RegExp(searchParams.title, "i");
    }
    if (searchParams.genre) {
        query.genre = new RegExp(searchParams.genre, "i");
    }
    if (searchParams.year) {
        query.year = searchParams.year;
    }

    let filteredMovies = await Movie.find(query);

    res.render("search", { movies: filteredMovies, filter: searchParams });
});

app.all("*", (req, res) => {
    res.render("404");
});

app.listen(5001, () => console.log("App is listening on http://localhost:5001..."));