import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
const baseUrl = `http://localhost:5050/api/v1`;
import {create} from "zustand";

const config = {
    headers : {
        "token" : getToken()
    }
}



export const createProductApi = (postBody) => {
        let url = `${baseUrl}/product/create`;
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


export const updateProductApi = (id,postBody) => {
    let url = `${baseUrl}/product/update/${id}`;
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




















