const createService = require("../../services/common/createService");
const listService = require("../../services/common/listService");
const updateService = require("../../services/common/updateService");
const dropdownService = require("../../services/common/dropdownService");
const detailsByIdService = require("../../services/common/detailsByIdService");
const suppliersModel = require("../../models/suppliersModel");
let purchasecModel = require("../../models/purchasecModel");
let deleteService = require("../../services/common/deleteService");
let checkAssociate = require("../../services/common/cheackAssociate");
const mongoose = require("mongoose");



exports.createSupplierController = async (req,res)=>{
    let result = await createService(req,suppliersModel);
    res.status(201).send(result)
};


exports.updateSupplierController = async (req,res)=>{
    let result = await updateService(req,suppliersModel);
    res.status(200).send(result)
};


exports.dropdownSupplierController = async (req,res)=>{
    let result = await dropdownService(req,suppliersModel,{  _id:1,name:1 });
    res.status(200).send(result)
};


exports.listSupplierController = async (req,res)=>{
    let searchValue = { "$regex" : req.params.searchKeyword, "$options" : "i" };
    let searchArray = [{ name : searchValue }]
    let result =  await listService(req,suppliersModel,searchArray);
    res.status(200).send(result)
};



exports.detailsByIdSupplierController = async (req,res)=>{
    let result = await detailsByIdService(req,suppliersModel);
    res.status(200).send(result)
};


exports.deleteSupplierController = async (req,res)=>{
    let deleteId = new mongoose.Types.ObjectId(req.params.id);
    let checkSupplier = await checkAssociate({supplierId:deleteId},purchasecModel);
    if (checkSupplier){
        res.status(200).json({
            status:"Associate",
            msg:"Associate with purchaseID"
        });
    }else {
        let result = await deleteService(req,suppliersModel);
        res.status(200).send(result);
    }
};





