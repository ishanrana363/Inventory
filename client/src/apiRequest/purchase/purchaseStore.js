import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
import {create} from "zustand";
const baseUrl = `http://localhost:5050/api/v1`;

const config = {
    headers : {
        "token" : getToken()
    }
};

const purchaseStore = create((set)=>({
    supplierDropDown : [],
    setSupplierDropDown : ()=>{
        let url = `${baseUrl}/supplier/dropdown`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                set({supplierDropDown:res.data["data"]})
            }else {
                return false;
            }
        }).catch((err)=>{
            return false;
        })
    },
    productDropDown : [],
    setProductDropDown : () =>{
        let url = `${baseUrl}/product/dropdown`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                set({productDropDown:res.data["data"]});
            }else {
                return false;
            }
        }).catch((err)=>{
            return false;
        })
    },


    purchaseData : [],
    totalPurchaseData : [],
    setPurchaseData : (pageNo,perPage,searchValue)=>{
        let url = `${baseUrl}/purchase-list/${pageNo}/${perPage}/${searchValue}`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                if (res.data["data"][0]["Rows"].length>0){
                    set({purchaseData:res.data["data"][0]["Rows"]});
                    set({totalPurchaseData:res.data["data"][0]["Total"][0]["count"]});
                }else {
                    set({purchaseData:[]});
                    set({totalPurchaseData:[]});
                }
            }else {
                return false;
            }
        }).catch((err)=>{
            return false;
        })
    },



}));

export default purchaseStore;