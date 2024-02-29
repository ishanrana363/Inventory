const listTowJoinService = async (req,dataModel,searchArray,joinOneState,joinTowState) => {
    try {
        let userEmail = req.headers["email"];
        let perPage = Number(req.params.perPage);
        let pageNo = Number(req.params.pageNo);
        let skipRow = (pageNo-1)*perPage;
        let searchValue = req.params.searchKeyword;
        let data;
        if (searchValue!=="0"){
            data = await dataModel.aggregate([
                { $match : { userEmail:userEmail } },
                { $match : { $or : searchArray } },
                joinOneState,joinTowState,
                {
                    $facet : {
                        Total : [ { $count : "total" } ],
                        Rows : [{ $skip:skipRow },{ $limit:perPage }]
                    }
                }
            ]);
        }else {
            data = await dataModel.aggregate([
                { $match : { userEmail:userEmail } },
                joinOneState,joinTowState,
                {
                    $facet : {
                        Total : [ { $count : "total" } ],
                        Rows : [{ $skip:skipRow },{ $limit:perPage }]
                    }
                }
            ]);
        }
        return{ status:"success",data : data };
    }catch (e) {
        return{ status:"fail",msg : e.toString() };
    }
};


module.exports = listTowJoinService;












