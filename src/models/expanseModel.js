const mongoose = require("mongoose");

const {Schema,model} = mongoose;

const expenseSchema = new Schema({
    userEmail : {
        type : String,
        required : true
    },
    typeId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    note : {
        type : String,
        required : true
    },
    createdDate : {
        type : Date,
        default : Date.now()
    }
},{
    versionKey:false
})

const expenseModel = model("expenses",expenseSchema);


module.exports = expenseModel;
















