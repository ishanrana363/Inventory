const userModel = require("../../models/userModel");
const otpModel = require("../../models/otpModel");
const sendEmailUtility = require("../../utility/emailUtility")

const sendEmailService = async (req) => {
    try {
        let email = req.params.email;
        let otpCode = Math.floor(1111+Math.random()*9999);
        let emailSub = `Inventory otp `;
        let emailText = `Your otp code ${otpCode}`;
        let filter = {
            email : email
        };
        let userData = await userModel.findOne(filter);
        if (userData){
            await sendEmailUtility(email,emailText,emailSub);
            await otpModel.updateOne(filter,{$set:{otp:otpCode}},{upsert:true});
            return {
                status:"success",
                msg:"4 digits otp has been send successfully"
            };
        }else{
            return {
                status:"fail",
                msg:"user not found."
            };
        }
    }catch (e) {
        return {
            status:"fail",
            msg : e.toString()
        };
    }
};

module.exports = sendEmailService;









