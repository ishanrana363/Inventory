const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const purchaseSchema = new Schema({
    userEmail : {
        type : String,
        required : true
    },
    supplierId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    vatTax : {
        type : Number,
        required : true
    },
    discount:{
        type :Number,
        required : true
    },
    otherCost : {
        type :Number,
        required : true
    },
    shippingCost : {
        type :Number,
        required : true
    },
    grandCost : {
        type :Number,
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
});


const purchasesModel = model("purchases",purchaseSchema);

module.exports = purchasesModel;