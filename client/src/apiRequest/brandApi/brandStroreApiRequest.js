import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
const baseUrl = `http://localhost:5050/api/v1`;
import {create} from "zustand";

const config = {
    headers : {
        "token" : getToken()
    }
};

const brandStore = create((set)=>({
    brandListData : [],
    totalBrandData : [],
    setBrandListData : (pageNo,perPage,searchValue) =>{
        let url = `${baseUrl}/brandList/${pageNo}/${perPage}/${searchValue}`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                if ( res.data["data"]["0"]["Rows"].length>0){
                    set({brandListData:res.data["data"]["0"]["Rows"]});
                    set({totalBrandData:res.data["data"]["0"]["Total"]["0"]["count"]});
                }else {
                    return false;
                }
            }else {
                return false;
            }
        }).catch((err)=>{
            return false;
        })
    },
    brandDetails : [],
    setBrandDetails : (id)=>{
        let url = `${baseUrl}/brand/details/${id}`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                set({brandDetails:res.data["data"]});
            }else {
                return false;
            }
        }).catch((err)=>{
            return false;
        })
    }
}));

export default brandStore;

