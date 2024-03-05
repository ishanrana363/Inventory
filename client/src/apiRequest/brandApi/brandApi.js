import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
const baseUrl = `http://localhost:5050/api/v1`;

const config = {
    headers : {
        "token" : getToken()
    }
};

export const createBrandApi = (postBody) => {
    let url = `${baseUrl}/brand/create`;
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