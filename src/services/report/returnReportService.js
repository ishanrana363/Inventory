const returnProductDataModel = require("../../models/returnProductData");

const returnReportService = async (req) => {
    try {
        let userEmail = req.headers["email"];
        let fromDate = req.body["fromDate"];
        let toDate = req.body["toDate"];
        let data = await returnProductDataModel.aggregate([
            { $match : { userEmail : userEmail, createdDate : { $gte :  new Date(fromDate), } } },
            {
                $facet : {
                    Total : [{ $group : { _id : 0 , totalAmount : { $sum : "$total" } } }],
                    Rows : [
                        { $lookup : { from:"products",localField:"productID",foreignField:"_id",as:"product" } },
                        { $unwind : "$product" },
                        { $lookup : { from:"categories",localField:"product.categoryId",foreignField:"_id",as:"category" } },
                        { $lookup : { from:"brands",localField:"product.brandId",foreignField:"_id",as:"brand" } },

                    ]
                }
            }
        ]);
        return { status:"success",data : data };
    }catch (e) {
        return { status:"fail", msg : e.toString() };
    }
};


module.exports = returnReportService;