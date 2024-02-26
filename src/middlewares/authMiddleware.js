const {decodeToken} = require("../utility/tokenUtility");


module.exports=(req,res,next)=>{
    let token = req.headers['token'];
    let decode = decodeToken(token);
    if (decode===null){
        res.status(401).send({
            status:"fail",
            msg : "unauthorized"
        })
    }else {
        let email = decode["email"];
        let id = decode["id"];
        req.headers.email = email;
        req.headers.id = id;
        next();
    }
};