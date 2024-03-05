import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
import {create} from "zustand";
const baseUrl = `http://localhost:5050/api/v1`;

const config = {
    headers : {
        "token" : getToken()
    }
};


const categoryStore = create((set)=>({
    categoryList : [],
    totalCategory : [],
    setCategoryList : (pageNo,perPage,searchValue)=>{
        let url = `${baseUrl}/category/${pageNo}/${perPage}/${searchValue}`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                if (res.data["data"]["0"]["Rows"].length>0){
                    set({categoryList:res.data["data"]["0"]["Rows"]});
                    set({totalCategory:res.data["data"]["0"]["Total"]["0"]["count"]})
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

    categoryDetails : [],
    setCategoryDetails : (id)=>{
        let url = `${baseUrl}/category/details/${id}`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                set({categoryDetails:res.data["data"]});
            }else {
                return false;
            }
        }).catch((err)=>{
            return false;
        })
    }



}));

export default categoryStore;