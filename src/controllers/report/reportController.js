const purchaseReportService = require("../../services/report/purchaseReportService");
const expenseReportService = require("../../services/report/expenseReportService");
const returnReportService = require("../../services/report/returnReportService");
const salesReportService = require("../../services/report/salesReportService");


exports.expenseReportController = async (req,res) => {
        let result = await expenseReportService(req);
        res.status(200).send(result);
};


exports.purchaseReportController = async (req,res) => {
        let result = await purchaseReportService(req);
        res.status(200).send(result);
};


exports.returnReportController = async (req,res) => {
        let result = await returnReportService(req);
        res.status(200).send(result);
};


exports.salesReportController = async (req,res) => {
        let result = await salesReportService(req);
        res.status(200).send(result);
};