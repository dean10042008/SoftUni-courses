import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { getErrorMessage } from './utils/error-utils.js';

import User from './models/User.js';
import Product from './models/Product.js';

const app = express();

const uri = 'mongodb://0.0.0.0:27017/PowerOfNature';
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
    helpers: {
        eq: (a, b) => a === b
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowedProtoMethodsByDefault: true
    }
}));

// Set default engine
app.set('view engine', 'hbs');

app.get("/", (req, res) => {
    return res.render("home", { title: "Home" });
});

app.get("/register", (req, res) => {
    if (req.cookies["userData"]) {
        return res.redirect("/");
    }

    return res.render("register", { title: "Register" });
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
        return res.render("register", { error: getErrorMessage(err), username, email, title: "Register" });
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

    return res.render("login", { title: "Login" });
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
        return res.render("login", { error: getErrorMessage(err), email, title: "Login" });
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

app.get("/catalog", async (req, res) => {
    const all = await Product.find({});

    return res.render("catalog", { all, title: "Catalog" });
});

app.get("/catalog/:id/details", async (req, res) => {
    let isOwner = false;
    let hasRecommended = false;
    const productData = await Product.findById(req.params.id);

    if (req.cookies["userData"]) {
        const user = await User.findOne({ email: (jwt.verify(req.cookies["userData"], secret)).email });

        isOwner = productData.owner.toString() === user._id.toString();
        hasRecommended = productData.recommendList.includes(user._id);
    }

    res.render("details", { isOwner, hasRecommended, productData, title: "Details" });
});

app.get("/catalog/:id/edit", async (req, res) => {
    let isOwner = false;
    const productData = await Product.findById(req.params.id);

    if (req.cookies["userData"]) {
        const user = await User.findOne({ email: (jwt.verify(req.cookies["userData"], secret)).email });
        isOwner = productData.owner.toString() === user._id.toString();
    }

    if (!isOwner) {
        return res.redirect("/");
    }
    
    res.render("edit", { name: productData.name, description: productData.description, image: productData.image, type: productData.type, location: productData.location, year: productData.year, title: "Edit" });
});

app.post("/catalog/:id/edit", async (req, res) => {
    const { name, type, image, description, year, location } = req.body;

    try {
        const product = {
            name: name.trim(),
            type: type.trim(),
            image: image.trim(),
            description: description.trim(),
            year: Number(year.trim()),
            location: location.trim()
        }

        await Product.findByIdAndUpdate(req.params.id, product, { runValidators: true });
    }
    catch(err) {
        console.error(err);
        return res.render("edit", { error: getErrorMessage(err), name, type, image, description, year, location, title: "Edit" });
    }

    res.redirect(`/catalog/${req.params.id}/details`);
    res.end();
});

app.get("/catalog/:id/delete", async (req, res) => {
    let isOwner = false;
    const productData = await Product.findById(req.params.id);

    if (req.cookies["userData"]) {
        const user = await User.findOne({ email: (jwt.verify(req.cookies["userData"], secret)).email });
        isOwner = productData.owner.toString() === user._id.toString();
    }

    if (!isOwner) {
        return res.redirect("/");
    }

    try {
        await Product.findByIdAndDelete(req.params.id);
    }
    catch(err) {
        console.error(err);
        return res.render("details", { error: getErrorMessage(err), title: "Details" });
    }

    res.redirect("/catalog");
    res.end();
});

app.get("/catalog/:id/recommend", async (req, res) => {
    let isOwner = true;
    const productData = await Product.findById(req.params.id);
    let user = {};

    if (req.cookies["userData"]) {
        user = await User.findOne({ email: (jwt.verify(req.cookies["userData"], secret)).email });
        isOwner = productData.owner.toString() === user._id.toString();
    }

    if (isOwner) {
        return res.redirect(`/catalog/${req.params.id}/details`);
    }

    if (productData.recommendList.includes(user._id)) {
        return res.redirect(`/catalog/${req.params.id}/details`);
    }

    try {
        productData.recommendList.push(user._id);
        await productData.save();
    }
    catch(err) {
        console.error(err);
        return res.redirect(`/catalog/${req.params.id}/details`, { error: getErrorMessage(err) });
    }
    
    res.redirect(`/catalog/${req.params.id}/details`);
    res.end();
});

app.get("/add", (req, res) => {
    if (!req.cookies["userData"]) {
        res.redirect("/");
        res.end();
    }

    return res.render("add", { title: "Create" });
});

app.post("/add", async (req, res) => {
    const { name, type, image, description, year, location } = req.body;
    const user = jwt.verify(req.cookies["userData"], secret);
    const owner = (await User.findOne({ email: user.email }))._id;

    try {
        const product = {
            name: name.trim(),
            type: type.trim(),
            image: image.trim(),
            description: description.trim(),
            year: Number(year.trim()),
            location: location.trim(),
            owner
        }

        await Product.create(product);
    }
    catch(err) {
        console.error(err);
        return res.render("add", { error: getErrorMessage(err), name, type, image, description, year, location, title: "Create" });
    }

    res.redirect("/catalog");
    res.end();
});

app.get("/search", async (req, res) => {
    const all = await Product.find({});

    res.render("search", { all, title: "Search" });
});

app.post("/search", async (req, res) => {
    const searchParams = req.body;
    
    let query = {};

    if (searchParams.name) {
        query.name = new RegExp(searchParams.name, "i");
    }

    if (searchParams.type) {
        query.type = searchParams.type;
    }

    const products = await Product.find(query);
    
    res.render("search", { all: products, searchParams, title: "Search" });
});

app.get("*", (req, res) => {
    res.render("404", { title: "404" });
});

app.listen(3000, () => "App is listening on http://localhost:3000");