const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const returnSummarySchema = new Schema({
    userEmail : {
        type : String,
        required : true
    },
    customerId : {
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
    grandTotal : {
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


const returnSummaryModel = model("returnSummaries",returnSummarySchema);

module.exports = returnSummaryModel;