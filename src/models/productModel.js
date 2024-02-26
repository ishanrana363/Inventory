const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const productSchema = new Schema({
    userEmail : {
        type : String,
        required : true
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    brandId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    name : {
        type : String,
        required : true
    },
    unit : {
        type : String,
        required : true
    },
    details : {
        type : String,
        required : true}
},{
    timestamps:true,
    versionKey:false
});

const productModel = model("products",productSchema);


module.exports = productModel;










