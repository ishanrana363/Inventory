import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
const baseUrl = `http://localhost:5050/api/v1`;

const config = {
    headers : {
        "token" : getToken()
    }
};

export const createCategoryApi = (postBody) => {
    let url = `${baseUrl}/category/create`;
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

export const deleteCategoryApi = (id) => {
    let url = `${baseUrl}/category/delete/${id}`;
    return axios.delete(url,config).then((res)=>{
        if (res.data["status"]==="success"){
            return true;
        }else {
            return false;
        }
    }).catch((e)=>{
        console.log(e);
        return false;
    })
};

export const updateCategoryApi = (id,postBody) => {
    let url = `${baseUrl}/category/update/${id}`;
    return axios.put(url,postBody,config).then((res)=>{
        if (res.data["status"]==="success"){
            return true;
        }else {
            return false;
        }
    }).catch((e)=>{
        return false
    })
};




