const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        unique : true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
        required: [true, 'User email required'],
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String
    }
}, { timestamps: true, versionKey: false });

const userModel = model("users", userSchema);

module.exports = userModel;
