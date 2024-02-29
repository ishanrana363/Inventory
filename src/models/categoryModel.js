const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const categorySchema = new Schema({
    userEmail : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true,
        unique : true
    }
},{
    timestamps : true, versionKey:false
});

const categoryModel = model("categories",categorySchema);

module.exports = categoryModel;