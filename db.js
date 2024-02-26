const mongoose = require("mongoose");
require("dotenv").config();
const dbUrl = process.env.DB_URL;


const connectDB = ()=>{
    try {
        mongoose.connect(dbUrl);
        console.log(`--Database is connectd--`);
    } catch (error) {
        console.log("Db is not connected");
    }
};

module.exports = connectDB;