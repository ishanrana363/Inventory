import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
const baseUrl = `http://localhost:5050/api/v1`;

const config = {
    headers : {
        "token" : getToken()
    }
};







export const purchaseCreateApi = (parentBody,childBody) => {
    let url = `${baseUrl}/purchase/create`;
    let postBody = {"parent" : parentBody,"child":childBody};
    return axios.post(url,postBody,config).then((res)=>{
        if (res.data["status"]==="success"){
            return true;
        }else {
            return false;
        }
    }).catch((err)=>{
        return false;
    })
};


export const purchaseDeleteApi = (id) => {
    let url = `${baseUrl}/purchase/delete/${id}`;
    return axios.delete(url,config).then((res)=>{
        if (res.data["status"]==="success"){
            return res.data["status"]
        }else {
            return false;
        }
    }).catch((err)=>{
        return false;
    })
}

