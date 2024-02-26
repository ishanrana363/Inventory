const jwt = require("jsonwebtoken");
require("dotenv").config();
const key = process.env.JWT_SECREATE_KEY;
const createToken = (email,id) => {
        let payload = {
            exp : Math.floor(Date.now()/1000)+60*60*60+24,
            id : id,
            email : email
        }
        return jwt.sign(payload,key);

};

const decodeToken = (token) => {
    try {
        return jwt.verify(token,key);
    }catch (e) {
        return null;
    }
};

module.exports = { createToken,decodeToken };