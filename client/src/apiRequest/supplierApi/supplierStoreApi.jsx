import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
import {errorToast} from "../../helpers/FormHelper.js";
import {create} from "zustand";
const baseUrl = `http://localhost:5050/api/v1`;

const config = {
    headers : {
        "token" : getToken()
    }
};


const supplierStore = create((set)=>({
    customerDataList:[],
    customerDataListTotal : [],
    customerDataListApi : (pageNo,perPage,searchValue) =>{
        let url = `${baseUrl}/supplier/${pageNo}/${perPage}/${searchValue}`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                if (res.data["data"]["0"]["Rows"].length>0){
                    set({customerDataList:res.data["data"]["0"]["Rows"]});
                    set({customerDataListTotal:res.data["data"]["0"]["Total"]["0"]["count"]});
                }
            }
        }).catch((err)=>{

        })
    },
    supplierDetails : [],
    setSupplierDetails : (id) =>{
        let url = `${baseUrl}/supplier/details/${id}`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                set({supplierDetails:res.data["data"]});
            }else {
                return false;
            }
        }).catch((err)=>{
            return false;
        })
    }
}));


export default supplierStore;