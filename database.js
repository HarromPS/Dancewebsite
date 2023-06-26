function dataDB(user) {
    // connect the database for our app

    let mongoose = require("mongoose");
    mongoose.connect("mongodb://127.0.0.1:27017/Dance", { useNewUrlParser: true, useUnifiedTopology: true });

    // create database
    let db = mongoose.connection;
    db.on("error",
        // console.log.error.bind("console", "connection error: ")
        console.log("Error")
    );

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

    let person=new subscriber(user);
    console.log(person);
    try{
        person.save();
        return true;
    }
    catch(e){
        return false;
    }
}

module.exports=dataDB;