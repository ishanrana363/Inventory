const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const expenseTypeSchema = new Schema({
    userEmail : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true,
        unique : true
    },
    createdDate : {
        type : Date,
        default : Date.now()
    }
},{
    versionKey : false
});

const expenseTypesModel = model("expenseTypes",expenseTypeSchema);

module.exports = expenseTypesModel;



