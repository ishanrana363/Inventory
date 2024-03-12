import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
const baseUrl = `http://localhost:5050/api/v1`;
import {create} from "zustand";

const config = {
    headers : {
        "token" : getToken()
    }
};

const salesStore = create((set)=>({
    customerDropDown : [],
    setCustomerDropDown : ()=>{
        let url = `${baseUrl}/customer/dropdown`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                set({customerDropDown:res.data["data"]});
            }else {
                set({customerDropDown:[]})
            }
        }).catch((err)=>{
            return false;
        })
    },

    saleList : [],
    totalSaleList : [],
    saleListApi : (pageNo,perPage,searchValue) =>{
        let url = `${baseUrl}/sales-list/${pageNo}/${perPage}/${searchValue}`;
        return  axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                if (res.data["data"][0]["Rows"].length>0){
                    set({saleList:res.data["data"][0]["Rows"]});
                    set({totalSaleList:res.data["data"][0]["Total"][0]["count"]});
                }else {
                    set({saleList:[]});
                    set({totalSaleList:[]});
                }
            }else {
                return false;
            }
        }).catch((err)=>{
            return false;
        })
    }

}));

export default salesStore;