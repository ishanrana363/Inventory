const createService = require("../../services/common/createService");
const listService = require("../../services/common/listService");
const updateService = require("../../services/common/updateService");
const dropdownService = require("../../services/common/dropdownService");
const detailsByIdService = require("../../services/common/detailsByIdService");
const customerModel = require("../../models/coustomarsModel");
const deleteService = require("../../services/common/deleteService");
const checkAssociate = require("../../services/common/cheackAssociate");
const sellProductModel = require("../../models/sellProductModel");
const mongoose = require("mongoose");


exports.createCustomerController = async (req,res)=>{
    let result = await createService(req,customerModel);
    res.status(201).send(result)
};


exports.updateCustomerController = async (req,res)=>{
    let result = await updateService(req,customerModel);
    res.status(200).send(result);
};


exports.dropdownCustomerController = async (req,res)=>{
    let result = await dropdownService(req,customerModel,{  _id:1,name:1 });
    res.status(200).send(result)
};


exports.listCustomerController = async (req,res)=>{
    let searchValue = { "$regex" : req.params.searchKeyword, "$options" : "i" };
    let searchArray = [{ name : searchValue }]
    let result =  await listService(req,customerModel,searchArray);
    res.status(200).send(result)
};



exports.detailsByIdCustomerController = async (req,res)=>{
    let result = await detailsByIdService(req,customerModel);
    res.status(200).send(result)
};



exports.deleteCustomerController = async (req,res)=>{
    let deleteId = new mongoose.Types.ObjectId(req.params.id);
    let checkSales = await checkAssociate({sellId:deleteId},sellProductModel);
    if (checkSales){
        res.status(200).send({
            status:"Associate",
            msg:"Associate with sell id"
        })
    }else {
        let result = await deleteService(req,customerModel);
        res.send(result)
    }
};






