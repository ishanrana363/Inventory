import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
const baseUrl = `http://localhost:5050/api/v1`;
import {create} from "zustand";

const config = {
    headers : {
        "token" : getToken()
    }
};

const productReturnStore = create((set)=>({
    returnData : [],
    totalReturnData : [],
    setReturnData : (pageNo,perPage,searchValue)=>{
        let url = `${baseUrl}/return-list/${pageNo}/${perPage}/${searchValue}`;
        return axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                if (res.data["data"][0]["Rows"].length>0){
                    set({returnData:res.data["data"][0]["Rows"]});
                    set({totalReturnData:res.data["data"][0]["Total"][0]["count"]});
                }else {
                    set({returnData:[]});
                    set({totalReturnData:[]});
                }
            }else {
                return false;
            }
        }).catch((err)=>{
            return false;
        })
    }
}));

export default productReturnStore;