const createService = require("../../services/common/createService");
const listService = require("../../services/common/listService");
const updateService = require("../../services/common/updateService");
const dropdownService = require("../../services/common/dropdownService");
const detailsByIdService = require("../../services/common/detailsByIdService");
const expenseTypeModel = require("../../models/expensTypeModel");
let deleteService = require("../../services/common/deleteService");
let cheackAssociate = require("../../services/common/cheackAssociate");
const expenseModel = require("../../models/expanseModel");
const mongoose = require("mongoose");



exports.createExpenseTypeController = async (req,res)=>{
    let result = await createService(req,expenseTypeModel);
    res.status(201).send(result)
};


exports.updateExpenseTypeController = async (req,res)=>{
    let result = await updateService(req,expenseTypeModel);
    res.status(200).send(result)
};


exports.dropdownExpenseTypeController = async (req,res)=>{
    let result = await dropdownService(req,expenseTypeModel,{  _id:1,name:1 });
    res.status(200).send(result)
};


exports.listExpenseTypeController = async (req,res)=>{
    let searchValue = { "$regex" : req.params.searchKeyword, "$options" : "i" };
    let searchArray = [{ name : searchValue }]
    let result =  await listService(req,expenseTypeModel,searchArray);
    res.status(200).send(result)
};



exports.detailsByIdExpenseTypeController = async (req,res)=>{
    let result = await detailsByIdService(req,expenseTypeModel);
    res.status(200).send(result)
};


exports.deleteExpenseTypeController = async (req,res)=>{
    let deleteId = new mongoose.Types.ObjectId(req.params.id);
    let checkTypeId = await cheackAssociate({typeId:deleteId},expenseModel);
    if (checkTypeId){
        res.status(200).json({
            status:"Associate",
            msg:"Associate with typeId"
        });
    }else {
        let result = await deleteService(req,expenseTypeModel);
        res.status(200).send(result);
    }
};









