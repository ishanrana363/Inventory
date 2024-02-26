const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const supplierSchema = new Schema({
    userEmail : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true,
    },
    address : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    createdDate : {
        type : Date,
        default : Date.now()
    }
},{
    versionKey:false
});


const supplierModel = model("suppliers",supplierSchema);

module.exports = supplierModel;

