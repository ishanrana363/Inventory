const legalModel = require("../../models/legalModel");

exports.legalFindController = async (req,res) => {
    try {
        let type = req.params.type;
        let filter = {type:type};
        let data = await legalModel.find(filter);
        res.status(200).json({
            status:"success",
            data : data
        });
    }catch (e) {
        res.status(500).json({
            status:"fail",
            msg:e.toString()
        });
    }
};