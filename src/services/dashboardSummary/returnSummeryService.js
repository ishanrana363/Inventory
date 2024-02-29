
const returnSummary = require("../../models/returnSummary")
const returnSummeryService =  async (req) => {
    try {
        let userEmail = req.headers["email"];
        let data = await returnSummary.aggregate([
            { $match : { userEmail : userEmail } },
            { $facet : {
                Total : [ { $group : { _id : 0 , total : { $sum : "$grandTotal" } } } ],
                 last60Days : [ { $group : { _id : { $dateToString : { format : "%Y-%m-%d" , date : "$createdDate" } }, totalAmount : { $sum : "$grandTotal"  } } },
                     { $sort : { _id : -1 } },
                     { $limit : 60 }
                 ]} }
        ]);
        return { status:"success" , data : data };
    }catch (e) {
        return { status:"fail" , msg : e.toString() };
    }
};


module.exports = returnSummeryService;