const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const otpSchema = new Schema({
    email: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'User email required']
    }, otp : {
        type : Number,
        required : true
    },status:{
        type : Number,
        default : 0
    }
},{timestamps:true,versionKey:false});

const otpModel = model("otps",otpSchema);

module.exports = otpModel;