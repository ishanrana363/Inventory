const mongoose = require("mongoose");
const {model,Schema} = mongoose;

const legalSchema = new Schema({
    description : {
        type : String
    },
    type : {
        type : String
    }
},{timestamps:true,versionKey:false});

const legalModel = model("legals",legalSchema);

module.exports = legalModel;