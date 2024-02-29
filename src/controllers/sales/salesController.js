const parentModel = require("../../models/sellSummaryModel");
const childModel = require("../../models/sellProductModel");
const createParentChildService = require("../../services/common/createPreantChildService");
const listOneJoinService = require("../../services/common/listOneJoinService");
const deleteService = require("../../services/common/parentChildDeleteService")



exports.salesCreateController = async (req,res)=>{
    let result = await createParentChildService(req,parentModel,childModel,"sellId");
    res.status(201).send(result)
};


exports.salesListController = async (req, res) => {
    const searchKeyword = req.params.searchKeyword;
    const searchRegex = { "$regex": searchKeyword, "$options": "i" };
    const joinWithSalesId = {
        $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "sales"
        }
    };
    const searchValue = [{ note: searchRegex },{"sales.userEmail":searchRegex},{"sales.address":searchRegex},
        {"sales.email":searchRegex}
    ];
    const result = await listOneJoinService(req, parentModel, searchValue, joinWithSalesId);
    res.status(200).json(result);
};


exports.salesDeleteController = async (req,res)=>{
    let result = await deleteService(req,parentModel,childModel,"sellId");
    res.status(200).send(result);
};