// require express
const express = require("express");

// create app
const app = express();
const path = require("path");
// let dataDB = require("./database");

// to save req.body require module body parser
const bodyParser = require("body-parser");
const host = "127.0.0.1";
const port = 800;


let mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/Dance", { useNewUrlParser: true, useUnifiedTopology: true });

// create database
let db = mongoose.connection;
db.on("error", () => {

    // console.log.error.bind("console", "connection error: ")
    console.log("Error")
});

db.once("open", function () {
    // we are connected
});

// lets create a schema
let contactSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    address: String,
    more: String
});

// lets create a collection/model
let subscriber = mongoose.model("subscriber", contactSchema);


// Express stuffs
app.use("/static", express.static("static"));
app.use(express.urlencoded());

// Pug Stuffs
app.set("view engine", "pug");
app.set("views", path.join(__dirname), "template");

console.log(app.request.url);
// app endpoints
app.get("/", (req, res) => {
    console.log(req.url);
    // res.send("HElll");
    res.status(200).render("template/home.pug");
});
app.get("/contact", (req, res) => {
    console.log(req.url);
    // res.send("HElll");
    res.status(200).render("template/contact.pug");
});

app.post("/contact", (req, res) => {

    let vals = new subscriber(req.body);
    vals.save();
    subscriber.find()
    subscriber.find()
        .then(function (models) {
            console.log(models);
        })
        .catch(function (err) {
            console.log(err);
        });
    res.send("Posted");
    // res.status(200).render("template/contact.pug");
});

// app.post("/",(request,response)=>{
//     response.status(200).render("template/contact.pug");
// });
// listening port 80
app.listen(port, () => {
    console.log(`Successfully port opened at ${port}`);
});
