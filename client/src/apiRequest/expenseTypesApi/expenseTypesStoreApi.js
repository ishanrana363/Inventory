import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
import {create} from "zustand";
const baseUrl = `http://localhost:5050/api/v1`;

const config = {
    headers : {
        "token" : getToken()
    }
};


const expenseTypeStore = create((set)=>({
    expenseTypeDataList : [],
    expenseTypeDataTotal : [],
    expenseTypeDataListApi : (pageNo,perPage,searchValue)=>{
        let url = `${baseUrl}/expense-types-list/${pageNo}/${perPage}/${searchValue}`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                if ( res.data['data']["0"]["Rows"].length>0 ){
                    set({expenseTypeDataList:res.data['data']["0"]["Rows"]});
                    set({expenseTypeDataTotal:res.data['data']["0"]["Total"]["0"]["count"]});
                }else {
                    return false;
                }
            }else {
                return false;
            }
        }).catch((err)=>{
            return false;
        })
    },

    expenseTypeDetails : [],
    setExpenseTypeDetails : (id)=>{
        let url = `${baseUrl}/expense-types/details/${id}`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                set({expenseTypeDetails: res.data["data"]});
            }else {
                return false;
            }
        }).catch((err)=>{
            return false
        })
    },

    expenseTypeDropdown : [],
    setExpenseTypeDropdown : ()=>{
        let url = `${baseUrl}/expense-types/dropdown`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                set({expenseTypeDropdown: res.data["data"]});
            }else {
                return false;
            }
        }).catch((err)=>{
            return false
        })
    },



}))

export default expenseTypeStore;