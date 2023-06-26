// Mongoose is a object data modeling "library"
// Helps to connect mongodb & node js

// lets connect mongodb & node js
// npm install mongoose
// import module mongoose
// create a connection through url

let mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/test",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

// create a connection through a database
let db = mongoose.connection;

// if any error occurs
db.on("error",
    console.error.bind(console, "connection error: ")
);

// once a connection is established
db.once("open", function () {
    console.log("we are connected");
});

// creating a schema(tell us how data is structured & organised)
let catSchema = mongoose.Schema({
    name: String        // where name strictly will be a string
});

// methods must be added to the schema before compiling it with mongoose.model()
catSchema.methods.speak = function () {
    let value = "My name is " + this.name;
    console.log(value);
}


// creating a model(collection) from schema
// compiling a schema into a model(compiled schema, values, schemaName) & saved in plural form
let kitten = mongoose.model("kitten", catSchema);

// model -> Add a new doc to the database, one instance of model will map to one document in database

// document/object of the model
let littenCat = new kitten({ name: "litten kitten" });
let littenCat2 = new kitten({ name: "litten kitten 2" });
console.log(littenCat.name);
littenCat.speak();

// to save the document/object/instance of a model to the database's collection using .save() method
// .save(function(error, objectToBeSaved))

// no longer accepts callback
// littenCat.save(function(error,littenCat){
//     if(error){
//         return console.error(error);
//     }
//     littenCat.speak();
// });

// use directly
littenCat.save();
littenCat2.save();

// to find the objects use find() method
kitten.find()
kitten.find()
    .then(function (models) {
        console.log(models);
})
    .catch(function (err) {
        console.log(err);
});

kitten.find({name: "litten kitten 2"})
kitten.find()
    .then(function (models) {
        console.log(models);
})
    .catch(function (err) {
        console.log(err);
});