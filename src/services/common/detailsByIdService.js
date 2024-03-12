const detailsByIdService = async (req,dataModel) => {
    try {
        let userEmail = req.headers["email"];
        let id = req.params.id
        let query = {};
        query.userEmail = userEmail;
        query["_id"] = id;
        let data = await dataModel.findOne(query);
        return { status:"success", data : data };
    }catch (e) {
        return { status:"fail" , msg : e.toString() };
    }
};


module.exports = detailsByIdService;