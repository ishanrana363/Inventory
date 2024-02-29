const expenseSummeryService = require("../../services/dashboardSummary/expenseSummeryService");
const purchaseSummeryService = require("../../services/dashboardSummary/purchaseSummaryService");
const returnSummeryService = require("../../services/dashboardSummary/returnSummeryService");
const sellSummeryService = require("../../services/dashboardSummary/salesSummeryService");


exports.expenseSummeryController = async (req,res)=>{
    let result = await expenseSummeryService(req);
    res.status(200).send(result);
};


exports.purchaseSummeryController = async (req,res)=>{
    let result = await purchaseSummeryService(req);
    res.status(200).send(result);
};


exports.returnSummeryController = async (req,res)=>{
    let result = await returnSummeryService(req);
    res.status(200).send(result);
};


exports.sellSummeryController = async (req,res)=>{
    let result = await sellSummeryService(req);
    res.status(200).send(result);
};



