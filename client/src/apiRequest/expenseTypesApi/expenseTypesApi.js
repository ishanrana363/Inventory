import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
import {errorToast} from "../../helpers/FormHelper.js";
const baseUrl = `http://localhost:5050/api/v1`;

const config = {
    headers : {
        "token" : getToken()
    }
};

export const createExpenseTypesApi = (postBody) => {
    let url = `${baseUrl}/expense-types/create`;
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

export const deleteExpenseTypesApi = (id) => {
    let url = `${baseUrl}/expense-types/delete/${id}`;
    return axios.delete(url,config).then((res)=>{
        if (res.data["status"]==="Associate"){
            errorToast("Associate with typeId");
        }
         else if (res.data["status"]==="success"){
            return true;
        }else {
            return false;
        }
    }).catch((e)=>{
        console.log(e);
    })
};

export const updateExpenseTypesApi = (id,postBody) => {
    let url = `${baseUrl}/expense-types/update/${id}`;
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







