const sellSummaryModel = require("../../models/sellSummaryModel");
const salesSummeryService = async (req) => {
    try {
        let userEmail = req.headers["email"];
        let data = await sellSummaryModel.aggregate([
            { $match : { userEmail : userEmail } },
            { $facet : {
                Total : [ { $group : { _id : 0 , totalAmount : { $sum : "$grandTotal" } } } ],
                 Last60Days : [
                     { $group : { _id : { $dateToString : { format : "%Y-%m-%d", date : "$createdDate" } }, totalAmount : { $sum : "$grandTotal" } } }
                 ]
            } }
        ])
        return { status: "success" , data : data }
    }catch (e) {
        return { status:"fail", msg : e.toString() };
    }
};


module.exports = salesSummeryService;