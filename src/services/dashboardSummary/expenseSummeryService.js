
const expanseModel = require("../../models/expanseModel");
const expenseSummeryService = async (req) => {
    try {
        let userEmail = req.headers["email"];
        let data = await expanseModel.aggregate([
            { $match : { userEmail: userEmail } },
            {
                $facet : {
                    Total : [{ $group : { _id : 0, totalAmount : { $sum : "$amount" } } }],
                    last30Days : [{ $group : { _id : { $dateToString : { format : "%Y-%m-%d" , date : '$createdDate' } },totalAmount : { $sum:"$amount" } } },
                        { $sort : { _id : -1 } },
                        { $limit : 30 }
                    ]
                }
            }
        ]);

        return { status:"success",data:data };

    }catch (e) {
        return { status:"fail", msg : e.toString() };
    }
};


module.exports = expenseSummeryService;