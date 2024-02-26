const userCreateService = require("../../services/users/userCreateService");
const userLoginService = require("../../services/users/userLoginService");
const userDetailsService = require("../../services/users/userDetailsService");
const userUpdateService = require("../../services/users/userUpdateService");
const sendEmailService = require("../../services/users/userVerifyEmailService");
const otpVerifyService = require("../../services/users/userVerifyOtpService");
const passwordResetService = require("../../services/users/passwordResetService");


exports.userCreateController = async (req,res)=>{
    let result = await userCreateService(req);
    res.status(201).send(result);
};

exports.userLoginController = async (req,res)=>{
    let result = await userLoginService(req);
    res.status(200).send(result);
};

exports.userProfileController = async (req,res)=>{
    let result = await userDetailsService(req);
    res.status(200).send(result);
};

exports.userUpdateController = async (req,res)=>{
    let result = await userUpdateService(req);
    res.status(200).send(result);
};

exports.sendEmailController = async (req,res)=>{
    let result = await sendEmailService(req);
    res.status(200).send(result);
};


exports.otpVerifyController = async (req,res)=>{
    let result = await otpVerifyService(req);
    res.status(200).send(result);
};

exports.passwordResetController = async (req,res)=>{
    let result = await passwordResetService(req);
    res.status(200).send(result);
};