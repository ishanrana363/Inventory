import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
const baseUrl = `http://localhost:5050/api/v1`;

const config = {
    headers : {
        "token" : getToken()
    }
};

export const createCustomerApi = (postBody) => {
    let url = `${baseUrl}/customer/create`;
    return axios.post(url,postBody,config).then((res)=>{
        if (res.data["status"]==="success"){
            return true;
        }else {
            return false;
        }
    }).catch((e)=>{
        console.log(e);
    })
};



export const deleteCustomerApi = (id) => {
    let url = `${baseUrl}/customer/delete/${id}`;
    return axios.delete(url,config).then((res)=>{
        if (res.data["status"]==="success"){
            return true;
        }else {
            return false;
        }
    }).catch((e)=>{
        console.log(e);
    })
};


export const updateCustomerApi = (id,postBody) => {
    let url = `${baseUrl}/customer/update/${id}`;
    return axios.put(url,postBody,config).then((res)=>{
        if (res.data["status"]==="success"){
            return true;
        }else {
            return false;
        }
    }).catch((e)=>{
        console.log(e);
    })
};



















