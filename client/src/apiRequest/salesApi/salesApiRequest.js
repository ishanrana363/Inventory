import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
const baseUrl = `http://localhost:5050/api/v1`;
import {create} from "zustand";

const config = {
    headers : {
        "token" : getToken()
    }
};

export const salesCreateApi = (parent,child) => {
    let url = `${baseUrl}/sales/create`;
    let postBody = { "parent" : parent,"child" : child };
    return axios.post(url,postBody,config).then((res)=>{
        if (res.data["status"]==="success"){
            return res.data["status"];
        }else {
            return false;
        }
    }).catch((err)=>{
        return false;
    })
};


export const salesDeleteApi = (id) => {
    let url = `${baseUrl}/sales/delete/${id}`;
    return axios.delete(url,config).then((res)=>{
        if (res.data["status"]==="success"){
            return res.data["status"];
        }else {
            return false;
        }
    }).catch((err)=>{
        return false;
    })
};





























