import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
import {create} from "zustand";
const baseUrl = `http://localhost:5050/api/v1`;

const config = {
    headers : {
        "token" : getToken()
    }
};

const expenseStore = create((set)=>({
    expenseDataList : [],
    totalExpenseData : [],
    setExpenseList : (pageNo,perPage,searchValue)=>{
        let url = `${baseUrl}/expense-list/${pageNo}/${perPage}/${searchValue}`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                if (res.data["data"]["0"]["Rows"].length>0){
                    set({expenseDataList:res.data["data"]["0"]["Rows"]});
                    set({totalExpenseData : res.data["data"]["0"]["Total"]["0"]["count"] })
                }else {
                    return false;
                }
            }else {
                return false;
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
}));



export default expenseStore;
















