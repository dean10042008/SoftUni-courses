import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { getErrorMessage } from './utils/error-utils.js';

import User from './models/User.js';
import Recipe from './models/Recipe.js';

const app = express();

const uri = 'mongodb://0.0.0.0:27017/HomeCookingRecipes';
const secret = "IAmAnIdiot";

try {
    await mongoose.connect(uri);
    console.log('Connected to DB Successfully');
} catch (err) {
    console.error('Cannot connect to DB!');
    console.log(err.message);
}

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
    const token = req.cookies["userData"];
    res.locals.isSignedIn = token !== undefined;
    next();
});

app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowedProtoMethodsByDefault: true
    }
}));

// Set default engine
app.set('view engine', 'hbs');

app.get("/", async (req, res) => {
    const allRecipes = await Recipe.find({});
    const lastThree = [];

    for (let i = -1; i >= -3; i--) {
        if (allRecipes.at(i) !== undefined) {
            lastThree.push(allRecipes.at(i));
        }
    }

    return res.render("home", { recipes: lastThree });
});

app.get("/register", (req, res) => {
    if (req.cookies["userData"]) {
        return res.redirect("/");
    }

    return res.render("register");
});

app.post("/register", async (req, res) => {
    const { username, email, password, rePassword } = req.body;

    try {
        if (password !== rePassword) {
            throw new Error("Passwords must match!");
        }

        const userExists = await User.countDocuments({ email: email });

        if (userExists > 0) {
            throw new Error("User already exists!");
        }

        await User.create({ username, email, password });
    }
    catch (err) {
        console.error(err);
        return res.render("register", { error: getErrorMessage(err), username, email });
    }

    const token = jwt.sign(
        {
            email,
            password,
            username,
        },
        secret
    );

    res.cookie("userData", token);

    res.redirect("/");
    res.end();
});

app.get("/login", (req, res) => {
    if (req.cookies["userData"]) {
        return res.redirect("/");
    }

    return res.render("login");
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    try {
        if (!user) {
            throw new Error("User doesn't exist!");
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
            throw new Error("Incorrect password");
        }
    }
    catch (err) {
        console.error(err);
        return res.render("login", { error: getErrorMessage(err), email });
    }

    const token = jwt.sign(
        {
            email,
            password,
            username: user.username,
        },
        secret
    );

    res.cookie("userData", token);

    res.redirect("/");
    res.end();
});

app.get("/logout", (req, res) => {
    if (!req.cookies["userData"]) {
        res.redirect("/");
        res.end();
    }

    res.clearCookie("userData");
    res.redirect("/");
    res.end();
});

app.get("/recipes", async (req, res) => {
    const allRecipes = await Recipe.find({});

    return res.render("recipes", { recipes: allRecipes });
});

app.get("/recipes/:id/details", async (req, res) => {
    let isOwner = false;
    let hasRecommended = false;
    const recipeData = await Recipe.findById(req.params.id);

    if (req.cookies["userData"]) {
        const user = await User.findOne({ email: (jwt.verify(req.cookies["userData"], secret)).email });

        isOwner = recipeData.owner.toString() === user._id.toString();
        hasRecommended = recipeData.recommendList.includes(user._id);
    }

    res.render("details", { isOwner, hasRecommended, recipeData });
});

app.get("/recipes/:id/edit", async (req, res) => {
    let isOwner = false;
    const recipeData = await Recipe.findById(req.params.id);

    if (req.cookies["userData"]) {
        const user = await User.findOne({ email: (jwt.verify(req.cookies["userData"], secret)).email });
        isOwner = recipeData.owner.toString() === user._id.toString();
    }

    if (!isOwner) {
        return res.redirect("/");
    }
    
    res.render("edit", { title: recipeData.title, description: recipeData.description, image: recipeData.image, ingredients: recipeData.ingredients, instructions: recipeData.instructions });
});

app.post("/recipes/:id/edit", async (req, res) => {
    const { title, description, image, instructions, ingredients } = req.body;

    try {
        const product = {
            title: title.trim(),
            description: description.trim(),
            image: image.trim(),
            instructions: instructions.trim(),
            ingredients: ingredients.trim(),
        }

        await Recipe.findByIdAndUpdate(req.params.id, product, { runValidators: true });
    }
    catch(err) {
        console.error(err);
        return res.render("edit", { error: getErrorMessage(err), title, description, image, instructions, ingredients });
    }

    res.redirect(`/recipes/${req.params.id}/details`);
    res.end();
});

app.get("/recipes/:id/delete", async (req, res) => {
    let isOwner = false;
    const recipeData = await Recipe.findById(req.params.id);

    if (req.cookies["userData"]) {
        const user = await User.findOne({ email: (jwt.verify(req.cookies["userData"], secret)).email });
        isOwner = recipeData.owner.toString() === user._id.toString();
    }

    if (!isOwner) {
        return res.redirect("/");
    }

    try {
        await Recipe.findByIdAndDelete(req.params.id);
    }
    catch(err) {
        console.error(err);
        return res.render(`/recipes/${req.params.id}/details`, { error: getErrorMessage(err) });
    }

    res.redirect("/recipes");
    res.end();
});

app.get("/recipes/:id/recommend", async (req, res) => {
    let isOwner = true;
    const recipeData = await Recipe.findById(req.params.id);
    let user = {};

    if (req.cookies["userData"]) {
        user = await User.findOne({ email: (jwt.verify(req.cookies["userData"], secret)).email });
        isOwner = recipeData.owner.toString() === user._id.toString();
    }

    if (isOwner) {
        return res.redirect(`/recipes/${req.params.id}/details`);
    }

    if (recipeData.recommendList.includes(user._id)) {
        return res.redirect(`/recipes/${req.params.id}/details`);
    }

    try {
        recipeData.recommendList.push(user._id);
        await recipeData.save();
    }
    catch(err) {
        console.error(err);
        return res.render(`/recipes/${req.params.id}/details`, { error: getErrorMessage(err) });
    }
    
    res.redirect(`/recipes/${req.params.id}/details`);
    res.end();
});

app.get("/add", (req, res) => {
    if (!req.cookies["userData"]) {
        res.redirect("/");
        res.end();
    }

    return res.render("add");
});

app.post("/add", async (req, res) => {
    const { title, description, image, instructions, ingredients } = req.body;
    const user = jwt.verify(req.cookies["userData"], secret);
    const owner = (await User.findOne({ email: user.email }))._id;

    try {
        const product = {
            title: title.trim(),
            description: description.trim(),
            image: image.trim(),
            instructions: instructions.trim(),
            ingredients: ingredients.trim(),
            owner
        }

        await Recipe.create(product);
    }
    catch(err) {
        console.error(err);
        return res.render("add", { error: getErrorMessage(err), title, description, image, instructions, ingredients });
    }

    res.redirect("/recipes");
    res.end();
});

app.get("/search", async (req, res) => {
    const recipes = await Recipe.find({});

    res.render("search", { recipes });
});

app.post("/search", async (req, res) => {
    const searchParams = req.body;
    
    let query = {};

    if (searchParams.search) {
        query.title = new RegExp(searchParams.search, "i");
    }

    const recipes = await Recipe.find(query);
    
    res.render("search", { recipes, searchParams });
});

app.get("*", (req, res) => {
    res.render("404");
});

app.listen(3000, () => "App is listening on http://localhost:3000");