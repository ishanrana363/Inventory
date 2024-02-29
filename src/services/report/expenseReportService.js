const expenseModel = require("../../models/expanseModel");

const expenseReportService = async (req) => {
    try {
        let userEmail = req.headers["email"];
        let fromDate = req.body["fromDate"];
        let toDate = req.body["toDate"];
        let data = await expenseModel.aggregate([
            {$match: {userEmail: userEmail, createdDate : { $gte : new Date(fromDate) } }},
            {
                $facet : {
                    total : [ { $group : { _id : 0 , totalAmount : { $sum : "$amount" } } } ],
                    Rows : [
                        { $lookup : { from : "expensetypes", localField:"typeId",foreignField:"_id",as:"expense" } },
                        { $unwind : "$expense" }
                    ]
                }
            }
        ]);


        return { status:"success", data :data };

    }catch (e) {
        return { status:"fail",msg:e.toString() };
    }
};


module.exports = expenseReportService;