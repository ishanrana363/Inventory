import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
import {errorToast} from "../../helpers/FormHelper.js";
const baseUrl = `http://localhost:5050/api/v1`;

const config = {
    headers : {
        "token" : getToken()
    }
};

export const supplierCreateApi = (postBody) => {
    let url = `${baseUrl}/supplier/create`;
    return axios.post(url,postBody,config).then((res)=>{
        if (res.data["status"]==="fail"){
            errorToast("Please provide unique email");
        }else if (res.data["status"]==="success"){
            return true;
        }else {
            return false
        }
    }).catch((e)=>{
        return false;
    })
};


export const supplierUpdateApi = (id,postBody) => {
    let url = `${baseUrl}/supplier/update/${id}`;
    return axios.put(url,postBody,config).then((res)=>{
        if (res.data["status"]==="success"){
            return res.data["status"];
        }else {
            return false;
        }
    }).catch((e)=>{
        return false;
    })
};




export const supplierDeleteApi = (id) => {
    let url = `${baseUrl}/supplier/delete/${id}`;
    return axios.delete(url,config).then((res)=>{
        if (res.data["status"]==="Associate"){
            errorToast("Associate with purchaseID");
        }else if ( res.data["status"]==="success" ){
            return res.data["status"];
        }
        else {
            return false;
        }
    }).catch((e)=>{
        return false;
    })
};