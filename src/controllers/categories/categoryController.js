const createService = require("../../services/common/createService");
const listService = require("../../services/common/listService");
const updateService = require("../../services/common/updateService");
const dropdownService = require("../../services/common/dropdownService");
const detailsByIdService = require("../../services/common/detailsByIdService");
const categoryModel = require("../../models/categoryModel");


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



