const userModel = require("../../models/userModel");
const {createToken} = require("../../utility/tokenUtility");

const userLoginService = async (req) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let filter = {
            email : email,
            password : password
        };
        let userData = await userModel.findOne(filter);
        if (userData){
            //create token
            let token = createToken(email,userData["_id"].toString());
            return {
                status:"success",
                token : token,
                data : userData
            };
        }else {
            return {
                status:"fail",
                msg:"user not found"
            }
        }
    }catch (e) {
        return {
            status:"fail",
            msg : e.toString()
        };
    }
};


module.exports = userLoginService;