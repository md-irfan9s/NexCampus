
// import all package and libraries

const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("DataBase Connection is Successfully Done"))
    .catch( (error) => {
        console.log("DataBase Connection Failed");
        console.log(error);
        process.exit(1);
    })
}