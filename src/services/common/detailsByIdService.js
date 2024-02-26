const mongoose = require("mongoose");
const detailsByIdService = async (req,dataModel) => {
    try {
        let id = new mongoose.Types.ObjectId(req.params.id);
        let email = req.headers["email"];
        let data = await dataModel.aggregate([
            { $match : {_id:id , email : email } }
        ]);
        return { status:"success",data:data };
    }catch (e) {
        return { status:"fail", msg : e.toString() };
    }
};


module.exports = detailsByIdService;