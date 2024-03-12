import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
const baseUrl = `http://localhost:5050/api/v1`;
import {create} from "zustand";

const config = {
    headers : {
        "token" : getToken()
    }
}

const productStore = create((set)=>({
    productList : [],
    totalProduct : [],
    setProduct : (pageNo,perPage,searchValue) =>{
        let url = `${baseUrl}/product-list/${pageNo}/${perPage}/${searchValue}`
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                if (res.data["data"]["0"]["Rows"].length>0){
                    set({productList:res.data["data"]["0"]["Rows"]});
                    set({totalProduct:res.data["data"]["0"]["Total"]["0"]["total"]});
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
    productDetailsDropDown : [],
    setProductDetailsDropDown : (id) =>{
        let url = `${baseUrl}/product/details/${id}`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                set({productDetailsDropDown:res.data["data"]});
            }else {
                return false;
            }
        }).catch((err)=>{
            return false;
        })
    }
}));

export default productStore;