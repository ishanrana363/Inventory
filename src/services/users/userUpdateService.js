const userModel = require("../../models/userModel");

const updateUserService =async (req) => {
    try {
        let email = req.headers["email"];
        let filter = {
            email : email
        };
        let reqBody = req.body;
        let data = await userModel.updateOne(filter,reqBody);
        return {
            status:"success",
            data : data
        }
    }catch (e) {
        return {
            status:"fail",
            msg:e.toString()
        };
    }
};

module.exports = updateUserService;