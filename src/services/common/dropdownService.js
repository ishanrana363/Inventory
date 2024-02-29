const dropdownService = async (req,dataModel,projection) => {
    try {
        let email = req.headers["email"];
        let data = await dataModel.aggregate([
            { $match : { userEmail : email } },
            { $project : projection }
        ]);
        return {status:"success", data : data};
    }catch (e) {
        return { status:"fail",msg:e.toString() };
    }
};


module.exports = dropdownService;