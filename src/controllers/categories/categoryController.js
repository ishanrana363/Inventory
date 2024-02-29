const createService = require("../../services/common/createService");
const listService = require("../../services/common/listService");
const updateService = require("../../services/common/updateService");
const dropdownService = require("../../services/common/dropdownService");
const detailsByIdService = require("../../services/common/detailsByIdService");
const categoryModel = require("../../models/categoryModel");
const productModel = require("../../models/productListModel");
const deleteService = require("../../services/common/deleteService");
const checkAssociate = require("../../services/common/cheackAssociate");
const mongoose = require("mongoose");

exports.createCategoryController = async (req,res)=>{
    let result = await createService(req,categoryModel);
    res.status(201).send(result);
};


exports.updateCategoryController = async (req,res)=>{
    let result = await updateService(req,categoryModel);
    res.status(200).send(result);
};


exports.categoryListController = async (req,res)=>{
    let searchRegex = { "$regex" : req.params.searchKeyword, "$options" : "i" };
    let searchValue = [{ name : searchRegex }]
    let result = await listService(req,categoryModel,searchValue) ;
    res.status(200).send(result);
};


exports.dropDownCategoryController = async (req,res)=>{
    let result = await dropdownService(req,categoryModel,{_id:1,name:1});
    res.status(200).send(result);
};


exports.categoryByIdDetailsController = async (req,res)=>{
    let result = await detailsByIdService(req,categoryModel);
    res.status(200).send(result);
};

exports.categoryDeleteController = async (req,res)=>{
    let deleteId = new mongoose.Types.ObjectId(req.params.id);
    let checkCategory = await checkAssociate({categoryId:deleteId },productModel);
    if (checkCategory){
        res.status(200).json({
            status:"associate",
            msg : "Associate with category"
        })
    }else {
        let result = await deleteService(req,categoryModel);
        res.status(200).send(result);
    }
};



