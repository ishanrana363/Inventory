import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
const baseUrl = `http://localhost:5050/api/v1`;
import {create} from "zustand";

const config = {
    headers : {
        "token" : getToken()
    }
};


export const createReturnApi = (parent,child) => {
    let url = `${baseUrl}/return/create`;
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


export const returnDeleteApi = (id) => {
    let url = `${baseUrl}/return/delete/${id}`;
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