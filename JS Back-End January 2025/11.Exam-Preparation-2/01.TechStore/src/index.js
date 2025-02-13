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

const uri = 'mongodb://0.0.0.0:27017/TechStore';
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
    const allProducts = await Product.find({});
    const lastThree = [];

    for (let i = -1; i >= -3; i--) {
        if (allProducts.at(i) !== undefined) {
            lastThree.push(allProducts.at(i));
        }
    }

    return res.render("home", { data: lastThree });
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

app.get("/catalog", async (req, res) => {
    const allProducts = await Product.find({});

    return res.render("catalog", { data: allProducts });
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

    res.render("details", { isOwner, hasRecommended, productData });
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
    
    res.render("edit", { brand: productData.brand, model: productData.model, hardDisk: productData.hardDisk, screenSize: productData.screenSize, ram: productData.ram, operatingSystem: productData.operatingSystem, cpu: productData.cpu, gpu: productData.gpu, price: productData.price, color: productData.color, weight: productData.weight, image: productData.image });
});

app.post("/catalog/:id/edit", async (req, res) => {
    const { brand, model, hardDisk, screenSize, ram, operatingSystem, cpu, gpu, price, color, weight, image } = req.body;

    try {
        const product = {
            brand: brand.trim(),
            model: model.trim(),
            hardDisk: hardDisk.trim(),
            screenSize: screenSize.trim(),
            ram: ram.trim(),
            operatingSystem: operatingSystem.trim(),
            cpu: cpu.trim(),
            gpu: gpu.trim(),
            price: Number(price.trim()),
            color: color.trim(),
            weight: weight.trim(),
            image: image.trim()
        }

        await Product.findByIdAndUpdate(req.params.id, product, { runValidators: true });
    }
    catch(err) {
        console.error(err);
        return res.render("edit", { error: getErrorMessage(err), brand, model, hardDisk, screenSize, ram, operatingSystem, cpu, gpu, price, color, weight, image });
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
        return res.render(`/catalog/${req.params.id}/details`, { error: getErrorMessage(err) });
    }

    res.redirect("/catalog");
    res.end();
});

app.get("/catalog/:id/recommend", async (req, res) => {
    let isOwner = true;
    const ProductData = await Product.findById(req.params.id);
    let user = {};

    if (req.cookies["userData"]) {
        user = await User.findOne({ email: (jwt.verify(req.cookies["userData"], secret)).email });
        isOwner = ProductData.owner.toString() === user._id.toString();
    }

    if (isOwner) {
        return res.redirect(`/catalog/${req.params.id}/details`);
    }

    if (ProductData.recommendList.includes(user._id)) {
        return res.redirect(`/catalog/${req.params.id}/details`);
    }

    try {
        ProductData.recommendList.push(user._id);
        await ProductData.save();
    }
    catch(err) {
        console.error(err);
        return res.render(`/catalog/${req.params.id}/details`, { error: getErrorMessage(err) });
    }
    
    res.redirect(`/catalog/${req.params.id}/details`);
    res.end();
});

app.get("/create", (req, res) => {
    if (!req.cookies["userData"]) {
        res.redirect("/");
        res.end();
    }

    return res.render("create");
});

app.post("/create", async (req, res) => {
    const { brand, model, hardDisk, screenSize, ram, operatingSystem, cpu, gpu, price, color, weight, image } = req.body;
    const user = jwt.verify(req.cookies["userData"], secret);
    const owner = (await User.findOne({ email: user.email }))._id;

    try {
        const product = {
            brand: brand.trim(),
            model: model.trim(),
            hardDisk: hardDisk.trim(),
            screenSize: screenSize.trim(),
            ram: ram.trim(),
            operatingSystem: operatingSystem.trim(),
            cpu: cpu.trim(),
            gpu: gpu.trim(),
            price: Number(price.trim()),
            color: color.trim(),
            weight: weight.trim(),
            image: image.trim(),
            owner,
        }

        await Product.create(product);
    }
    catch(err) {
        console.error(err);
        return res.render("create", { error: getErrorMessage(err), brand, model, hardDisk, screenSize, ram, operatingSystem, cpu, gpu, price, color, weight, image });
    }

    res.redirect("/catalog");
    res.end();
});

app.get("/about", (req, res) => {
    return res.render("about");
});

app.get("/profile", async (req, res) => {
    if (!req.cookies["userData"]) {
        res.redirect("/");
        return res.end();
    }

    const userData = jwt.verify(req.cookies["userData"], secret);
    const userId = (await User.findOne({ email: userData.email }))._id;
    const createdProducts = await Product.find({ owner: userId });
    const preferredProducts = await Product.find({ recommendList: userId });

    res.render("profile", { userData, createdProducts, preferredProducts });
});

app.get("*", (req, res) => {
    res.render("404");
});

app.listen(3000, () => "App is listening on http://localhost:3000");