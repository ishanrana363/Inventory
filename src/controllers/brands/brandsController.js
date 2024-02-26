const brandModel = require("../../models/brandModel")
const createService = require("../../services/common/createService");
const listService = require("../../services/common/listService");
const updateService = require("../../services/common/updateService");
const dropdownService = require("../../services/common/dropdownService");
const detailsByIdService = require("../../services/common/detailsByIdService");




exports.brandCreateController = async (req,res)=>{
    let result = await createService(req,brandModel);
    res.status(201).send(result);
};

exports.brandUpdateController = async (req,res)=>{
    let result = await updateService(req,brandModel);
    res.status(200).send(result);
};


exports.brandDropDownController = async (req,res)=>{
    let result = await dropdownService(req,brandModel,{_id:1,name:1});
    res.status(200).send(result);
};


exports.brandListController=async (req, res) => {
    let SearchRgx = {"$regex": req.params.searchKeyword, "$options": "i"}
    let SearchArray=[{name: SearchRgx}]
    let Result= await listService(req,brandModel,SearchArray);
    res.status(200).json(Result)
};



exports.brandDetailsIdController = async (req,res)=>{
    let result = await detailsByIdService(req,brandModel);
    res.status(200).send(result);
};















