const otpModel = require("../../models/otpModel");
const userModel = require("../../models/userModel");

const passwordResetService = async (req) => {
    try {
        let otpCode = req.body.otp;
        let email = req.body.email;
        let newPassword = req.body.newPassword;
        let statusData = 1;
        let statusUpdate = 0;
        let filter = {
            email : email,
            otp : otpCode,
            status : statusData
        };
        let userOtpData = await otpModel.findOne(filter);
        if (userOtpData){
            await userModel.findOneAndUpdate({email:email},{$set:{password:newPassword}});
            await otpModel.findOneAndUpdate(filter,{$set:{ otp:0,status:statusUpdate }});
            return {
                status:"success",
                msg:"password change successfully"
            };
        }else {
            return {
                status:"fail",
                msg:"otp not found"
            }
        }
    }catch (e) {
        return {
            status:"fail",
            msg : e.toString()
        };
    }
};

module.exports = passwordResetService;