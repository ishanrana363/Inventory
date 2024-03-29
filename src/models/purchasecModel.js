const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const purchaseSchema = new Schema({
    userEmail : {
        type : String,
    },
    supplierId : {
        type : mongoose.Schema.Types.ObjectId,
    },
    vatTax : {
        type : Number,
        required : true
    },
    discount:{
        type :Number,
    },
    otherCost : {
        type :Number,
        required : true
    },
    shippingCost : {
        type :Number,
        required : true
    },
    grandTotal : {
        type :Number,
        required : true
    },
    note : {
        type : String,
        required:true
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