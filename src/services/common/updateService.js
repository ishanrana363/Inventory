const updateService = async (req,dataModel) => {
    try {
        let email = req.headers["email"];
        let id = req.params.id;
        let reqBody = req.body;
        let update = reqBody;
        let filter = {
            email : email,
            _id : id
        };
        let data = await dataModel.updateOne(filter,update);
        return {
            status:"success",
            data : data
        };
    }catch (e) {
        return {
            status:"fail",
            msg:e.toString()
        };
    }
};


module.exports = updateService;