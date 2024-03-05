const mongoose = require("mongoose");
const deleteService =async (req,dataModel) => {
    try {
        let id = req.params.id;
        let userEmail = req.headers["email"];
        let queryObj = {};
        queryObj["_id"] = id;
        queryObj["userEmail"] = userEmail;
        let data = await dataModel.deleteMany(queryObj);
        return { status:"success",data:data };
    }catch (e) {
        return { status:"fail", msg:e.toString() };
    }
};


module.exports = deleteService;