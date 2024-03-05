import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
import {create} from "zustand";
const baseUrl = `http://localhost:5050/api/v1`;

const config = {
    headers : {
        "token" : getToken()
    }
};


export const createExpenseApi = (postBody) => {
    let url = `${baseUrl}/expense/create`;
    return axios.post(url,postBody,config).then((res)=>{
        if (res.data["status"]==="success"){
            console.log('ishan')
            return true;
        }else {
            return false;
        }
    }).catch((err)=>{
        console.log(err)
        return false
    })
};



export const deleteExpenseApi = (id) => {
    let url = `${baseUrl}/expense/delete/${id}`;
    return axios.delete(url,config).then((res)=>{
        if (res.data["status"]==="success"){
            console.log(res.data["status"])
            return true;
        }else {
            return false;
        }
    }).catch((err)=>{
        console.log(err)
        return false
    })
};

export const updateExpenseApi = (id,postBody) => {
    let url = `${baseUrl}/expense/update/${id}`;
    return axios.put(url,postBody,config).then((res)=>{
        if (res.data["status"]==="success"){
            return res.data["status"];
        }else {
            return false;
        }
    }).catch((err)=>{
        return false;
    })
};