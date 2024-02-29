
const purchasecModel = require("../../models/purchasecModel");


const purchaseSummaryService = async (req) => {
    try {
        let userEmail =  req.headers["email"];
        let data = await purchasecModel.aggregate([
            { $match : { userEmail : userEmail } },
            { $facet : {
                Total :  [ { $group : { _id : 0 , totalAmount : { $sum : "$grandTotal" } } } ],
                Last60Days : [
                    { $group : { _id : { $dateToString : { format : "%Y-%m-%d ", date : "$createdDate" } } , totalAmount : { $sum : "$grandTotal" } } },
                    { $sort : { _id : -1 } },
                    { $limit : 60 }
                ]
            } }
        ]);
        return { status:"success" , data : data };
    }catch (e) {
        return{ status:"success",msg:e.toString()};
    }
};


module.exports = purchaseSummaryService;