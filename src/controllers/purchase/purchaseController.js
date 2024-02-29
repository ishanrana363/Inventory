const parentModel = require("../../models/purchasecModel");
const childModel = require("../../models/purchaseProductModel");
const createParentChildService = require("../../services/common/createPreantChildService");
const listOneJoinService = require("../../services/common/listOneJoinService");
const parentChildDeleteService = require("../../services/common/parentChildDeleteService")

exports.createPurchaseController= async (req,res) => {
    let result = await createParentChildService(req,parentModel,childModel,"purchaseID");
    res.status(201).send(result)
};


exports.purchaseListController = async (req, res) => {
        const searchKeyword = req.params.searchKeyword;
        const searchRegex = { "$regex": searchKeyword, "$options": "i" };
        const joinWithSupplierId = {
            $lookup: {
                from: "suppliers",
                localField: "supplierId",
                foreignField: "_id",
                as: "supplier"
            }
        };
        const searchValue = [{ note: searchRegex },{"supplier.userEmail":searchRegex},{"supplier.address":searchRegex},
            {"supplier.email":searchRegex}
        ];
        const result = await listOneJoinService(req, parentModel, searchValue, joinWithSupplierId);
        res.status(200).json(result);
};

exports.deletePurchaseController = async (req,res)=>{
    let result = await parentChildDeleteService(req,parentModel,childModel,"purchaseID");
    res.status(200).send(result);
};