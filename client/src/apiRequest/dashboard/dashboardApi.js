import axios from "axios";

const baseUrl = `http://localhost:5050/api/v1`;
import {create} from "zustand";
import {getToken} from "../../helpers/SessionHelper.js";

const config = {
    headers : {
        "token" : getToken()
    }
};

const dashboardStore = create((set)=>({
    expenseData : [],
    expenseDataTotal : [],
    setExpenseData : () =>{
        let url = `${baseUrl}/expense/summery`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                set({expenseData:res.data["data"][0]["last30Days"]});
                set({expenseDataTotal:res.data["data"][0]["Total"][0]["totalAmount"]});
            }else {
                return false;
            }
        }).catch((err)=>{
            return false;
        })
    },
    purchaseData : [],
    totalPurchaseData : [],
    setPurchaseData : ()=>{
        let url = `${baseUrl}/purchase/summery`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                set({purchaseData:res.data["data"][0]["Last60Days"]});
                set({totalPurchaseData:res.data["data"][0]["Total"][0]["totalAmount"]});
            }else {
                return false;
            }
        }).catch((err)=>{
            return false;
        })
    },
    returnData : [],
    totalReturnData : [],
    setReturnData : ()=>{
        let url = `${baseUrl}/return/summery`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                set({returnData:res.data["data"][0]["last60Days"]});
                set({totalReturnData:res.data["data"][0]["Total"][0]["total"]});
            }else {
                return false;
            }
        }).catch((err)=>{
            return false;
        })
    },
    sellData : [],
    sellDataTotal : [],
    setSellData : () =>{
        let url = `${baseUrl}/sales/summery`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                set({sellData:res.data["data"][0]["Last60Days"]});
                set({sellDataTotal:res.data["data"][0]["Total"][0]["totalAmount"]});
            }else {
                return false;
            }
        }).catch((err)=>{
            return false;
        })
    }

}));



export default dashboardStore;