const createService = async (req,dataModel) => {
    try{
        let reqBody = req.body;
        reqBody.email = req.headers["email"];
        let data = await dataModel.create(reqBody);
        return {
            status:"success",
            data : data
        };
    }catch (e) {
        return {
            status:"fail",
            msg : e.toString()
        };
    }
};


module.exports = createService;