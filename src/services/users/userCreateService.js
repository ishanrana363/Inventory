
const userModel = require("../../models/userModel")


const userCreateService = async (req) => {
    try {
        let result = await userModel.findOne({email: req.body.email});
        if (result){
            return {
                status:"fail",
                msg : "user already exists"
            };
        }
        let reqBody = req.body;
        let data = await userModel.create(reqBody);
        return {
            status:"success",
            data : data
        };
    }catch (e) {
        return {
            status:"fail",msg:e.toString()
        };
    }
};

module.exports = userCreateService;