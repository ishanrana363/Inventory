const listOneJoinService =async (req,dataModel,searchArray,joinStage) =>{
    try {
        let userEmail = req.headers["email"];
        let perPage = Number(req.params.prePage);
        let pageNo = Number(req.params.pageNo);
        let searchValue = req.params.searchValue;
        let skipRow = (pageNo-1)*perPage;
        let data;
        if (searchValue!=="0"){
            data = await dataModel.aggregate([
                { $match : { userEmail : userEmail } },
                joinStage,
                { $match : { $or : searchValue } },
                { $facet : {
                    total : [{ $count : "count" }],
                    rows : [ { $skip : skipRow, $limit : perPage } ]
                } }
            ]);
        }else {
            data = await dataModel.aggregate([
                { $match : { userEmail : userEmail } },
                joinStage,
                { $facet : {
                    total : [{ $count : "total" }],
                    rows : [ { $skip : skipRow , $limit : perPage } ]
                } }
            ]);
        }
        return { status:"success", data : data};
    }catch (e) {
        return { status:"fail", msg : e.toString()};
    }
};


module.exports = listOneJoinService;