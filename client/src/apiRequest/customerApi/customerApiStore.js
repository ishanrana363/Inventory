import {create} from "zustand";
import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
const baseUrl = `http://localhost:5050/api/v1`;

const config = {
    headers : {
        "token" : getToken()
    }
};

const customerStore = create((set)=>({
    customerData : [],
    totalCustomerData : [],
    setCustomerData : (pageNo,perPageData,searchValue) =>{
        let url = `${baseUrl}/customer/${pageNo}/${perPageData}/${searchValue}`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                if (res.data["data"][0]["Rows"].length>0){
                    set({customerData:res.data["data"][0]["Rows"]});
                    set({totalCustomerData:res.data["data"][0]["Total"][0]["count"]})

                }
            }
        }).catch((err)=>{

        })
    },

    getCustomerData :[],
    getCustomerDataApi : (id)=>{
        let url = `${baseUrl}/customer/details/${id}`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                set({getCustomerData:res.data["data"]});
            }
        }).catch((err)=>{
            return false;
        })
    },

}));


export default customerStore;