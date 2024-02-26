const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const returnProductDataSchema = new Schema({
    userEmail : {
        type : String,
        required : true
    },
    returnId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    productID : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    qty:{
        type :Number,
        required : true
    },
    uniCost : {
        type :Number,
        required : true
    },
    total : {
        type :Number,
        required : true
    },
    createdDate : {
        type : Date,
        default : Date.now()
    }
},{
    versionKey:false
});


const returnProductDataModel = model("returnProducts",returnProductDataSchema);

module.exports = returnProductDataModel;