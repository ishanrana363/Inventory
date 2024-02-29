const mongoose = require("mongoose");


const createParentsChildService = async (req,parentsModel,childModel,joinPropertyName) => {
    // create session
    let session = await mongoose.startSession();
    try {
        await session.startTransaction();

        //1st database process

        let parent = req.body["parent"];
        parent.userEmail = req.headers["email"];
        let parentCreation = await parentsModel.create([parent],{session});

        //2nd database process

        let child = req.body.child;
        await child.forEach((element)=>{
            element["userEmail"] = req.headers["email"];
            element[joinPropertyName] = parentCreation[0]["_id"];
        });

        let childCreation = await childModel.insertMany(child,{session});

        await session.commitTransaction();
        session.endSession();
        return{status:"success",parent:parentCreation,child:childCreation};

    }catch (e) {
        console.log(`error is ::::::`,e)
        await session.abortTransaction();
        session.endSession();
        return { status:"fail", msg:e.toString() };
    }
};

module.exports = createParentsChildService;






// try {
//     let userEmail = req.headers["email"];
//     //parents creation
//     let parent = req.body["parent"];
//     parent.userEmail = userEmail;
//     let parentCreation = await parentsModel.create(parent);
//     if (parentCreation["_id"]){
//         try {
//             let child = req.body["child"];
//             await child.forEach((element)=>{
//                 element[joinPropertyName] = parentCreation["_id"];
//                 element["userEmail"] = req.headers["email"];
//             });
//             let childCreation = await childModel.insertMany(child);
//             return { status:"success",parent : parentCreation,child:childCreation };
//         }catch (e){
//             await parentCreation.remove(parentCreation["_id"]);
//             return { status:"fail" , msg:" child creation fail " }
//         }
//     }else {
//         return {status:"fail" , msg : "parent creation fail" };
//     }
// }catch (e) {
//     return {status:"fail" , msg : e.toString() };
// }