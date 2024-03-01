const createService = require("../../services/common/createService");
const updateService = require("../../services/common/updateService");
const listTowJoinService = require("../../services/common/listTowJoinService");
const deleteService = require("../../services/common/deleteService");
const checkkAssociate = require("../../services/common/cheackAssociate");
const detailsByIdService = require("../../services/common/detailsByIdService");
const sellProductModel = require("../../models/sellProductModel");
const returnProductDataModel = require("../../models/returnProductData");
const purchaseProductModel = require("../../models//purchaseProductModel");
const productListModel = require("../../models/productListModel");
const mongoose = require("mongoose");


exports.productCreateController = async (req,res)=>{
    let result = await createService(req,productListModel);
    res.status(201).send(result);
};


exports.productUpdateController = async (req,res)=>{
    let result = await updateService(req,productListModel);
    res.status(200).send(result);
};


exports.productListController = async (req,res)=>{
    let searchValue = { "$regex" : req.params.searchKeyword , "$options":"i" };
    let joinWithBrandId = { $lookup : {
        from:"brands", localField:"brandId", foreignField:"_id",as:"brand"
    } };
    let joinWithCategoryId = { $lookup : {
            from:"categories", localField:"categoryId", foreignField:"_id",as:"category"
        } };
    let searchArray = [
        { name : searchValue }, { unit : searchValue }, { details : searchValue } , { "brand.name" : searchValue },
        { "category.name" : searchValue }

    ];
    let result = await listTowJoinService(req,productListModel,searchArray,joinWithBrandId,joinWithCategoryId);
    res.status(200).send(result);
};

exports.productDeleteController = async (req,res)=>{
    let deleteId = new mongoose.Types.ObjectId(req.params.id);
    let checkAssociateSellProductModel = await checkkAssociate({productID:deleteId},sellProductModel);
    let checkAssociateReturnProductDataModel = await checkkAssociate({productID:deleteId},returnProductDataModel);
    let checkAssociatePurchaseProductModel = await checkkAssociate({productID:deleteId},purchaseProductModel);
    if (checkAssociateSellProductModel){
        res.status(200).json({
            status:"Associate",
            msg : "Associate with sell"
        });
    }else if (checkAssociateReturnProductDataModel){
        res.status(200).json({
            status:"Associate",
            msg : "Associate with return"
        });
    }else if (checkAssociatePurchaseProductModel){
        res.status(200).json({
            status:"Associate",
            msg : "Associate with Purchase"
        });
    }else {
        let result = await deleteService(req,productListModel);
        res.status(200).send(result);
    }
};

exports.productDetailsById = async (req,res)=>{
    let result = await detailsByIdService(req,productListModel);
    res.status(200).send(result);
};









