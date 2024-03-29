const userModel = require("../../models/userModel");

const profileDetailsService =async (req) => {
    try {
        let email = req.headers["email"];
        let filter = {
            email : email
        };
        let data = await userModel.findOne(filter);
        return {
            status:"success",
            data : data
        };
    }catch (e) {
        return {
            status:"fail",
            msg:e.toString()
        };
    }
};

module.exports = profileDetailsService;