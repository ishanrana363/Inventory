const createService = require("../../services/common/createService");
const updateService = require("../../services/common/updateService");
const dropdownService = require("../../services/common/dropdownService");
const detailsByIdService = require("../../services/common/detailsByIdService");
const listOneJoinService = require("../../services/common/listOneJoinService");
const deleteService = require("../../services/common/deleteService")

const expenseModel = require("../../models/expanseModel");


exports.createExpenseController = async (req,res)=>{
    let result = await createService(req,expenseModel);
    res.status(201).send(result)
};


exports.updateExpenseController = async (req,res)=>{
    let result = await updateService(req,expenseModel);
    res.status(200).send(result)
};


exports.listExpenseController = async (req,res)=>{
    let JoinStage = {
        $lookup: {
            from: "expensetypes",
            localField: "typeId",
            foreignField: "_id",
            as: "type"
        }
    };
    let searchValue = { "$regex" : req.params.searchKeyword, "$options" : "i" };
    let searchArray = [{ 'type.name' : searchValue },{note:searchValue}];
    let result = await listOneJoinService(req,expenseModel,searchArray,JoinStage);
    res.status(200).send(result);
};



exports.detailsByIdExpenseController = async (req,res)=>{
    let result = await detailsByIdService(req,expenseModel);
    res.status(200).send(result)
};

exports.deleteExpenseController = async (req,res)=>{
    let result = await deleteService(req,expenseModel);
    res.status(200).send(result)
};