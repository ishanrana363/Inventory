import axios from "axios";
import {setToken, setUserDetails} from "../helpers/SessionHelper.js";
const baseUrl = `http://localhost:5050/api/v1`

export const registration = async (postBody)=>{
    try{
        let res = await axios.post(`${baseUrl}/create`,postBody);
        if (res.data["status"]==="success"){
            return res.data["status"];
        }else {
            return false;
        }
    }   catch (e){
        return false
    }
};


export const userLoginApi = async (postBody)=>{
    try{
        let res = await axios.post(`${baseUrl}/login`,postBody);
        if (res.data["status"]==="success"){
            setToken(res.data["token"])
            setUserDetails(res.data["data"])
            return res.data["status"];
        }else {
            return false;
        }
    }   catch (e){
        return false
    }
}