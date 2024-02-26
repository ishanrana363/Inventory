const otpModel = require("../../models/otpModel");

const otpVerifyService = async (req) => {
    try {
        let email = req.params.email;
        let otpCode = req.params.otpCode;
        let status = 0;
        let statusUpdate = 1
        let filter = {
            email : email,
            otp : otpCode,
            status : status,
        };
        let userOtpData = await otpModel.findOne(filter);
        if (userOtpData){
            await otpModel.findOneAndUpdate(filter,{$set:{status:statusUpdate}});
            return {
                status:"success",
                msg:"otp verification successfully"
            };
        }else {
            return {
                status:"fail",
                msg:"otp not found"
            };
        }
    }catch (e) {
        return {
            status:"fail",
            msg:e.toString()
        };
    }
};


module.exports = otpVerifyService;