const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const purchaseProductSchema = new Schema({
    userEmail : {
        type : String,
        required : true
    },
    purchaseID : {
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


const purchaseProductModel = model("purchaseProducts",purchaseProductSchema);

module.exports = purchaseProductModel;