const mongoose = require("mongoose");
const parentChildDeleteService = async (req,parentModel,childModel,joinState) => {
    let session = await mongoose.startSession();
    try {
        await session.startTransaction();
        let userEmail = req.headers["email"];
        let deleteId = req.params.id;

        let parentObj = {};
        parentObj.userEmail = userEmail;
        parentObj["_id"] = deleteId;

        let childObj = {};
        childObj.userEmail = userEmail;
        childObj[joinState] = deleteId;

        let childDelete = await childModel.deleteMany(childObj).session(session);
        let parentDelete = await parentModel.deleteMany(parentObj).session(session);

        await session.commitTransaction();
        session.endSession();

        return { status:"success", child : childDelete,parent:parentDelete };

    }catch (e){
        await session.abortTransaction();
        session.endSession();
        return { status:"fail", msg:e.toString() };
    }
};


module.exports = parentChildDeleteService;