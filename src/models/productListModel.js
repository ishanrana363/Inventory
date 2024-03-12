const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const productSchema = new Schema({
    userEmail : {
        type : String,
        required : true
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
    },
    brandId : {
        type : mongoose.Schema.Types.ObjectId,
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

const productListModel = model("products",productSchema);


module.exports = productListModel;










