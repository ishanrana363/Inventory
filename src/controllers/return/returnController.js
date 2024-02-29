const parent = require("../../models/returnSummary")
const child = require("../../models/returnProductData")
const createParentChildService = require("../../services/common/createPreantChildService");
const listOneJoinService = require("../../services/common/listOneJoinService");
const deleteService = require("../../services/common/parentChildDeleteService")



exports.returnCreateController = async (req,res)=>{
    let result = await createParentChildService(req,parent,child,"returnId");
    res.status(201).send(result)
};


exports.returnListController = async (req, res) => {
    const searchKeyword = req.params.searchKeyword;
    const searchRegex = { "$regex": searchKeyword, "$options": "i" };
    const joinWithSalesId = {
        $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "return"
        }
    };
    const searchValue = [{ note: searchRegex },{"sales.userEmail":searchRegex},{"sales.address":searchRegex},
        {"sales.email":searchRegex}
    ];
    const result = await listOneJoinService(req, parent, searchValue, joinWithSalesId);
    res.status(200).json(result);
};


exports.deleteReturnController = async (req,res)=>{
    let result = await deleteService(req,parent,child,"returnId");
    res.status(200).send(result);
};























