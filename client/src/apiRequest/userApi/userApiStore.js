import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
import {create} from "zustand";
const baseUrl = `http://localhost:5050/api/v1`;

const config = {
    headers : {
        "token" : getToken()
    }
};

const userDataStore = create((set)=>({
    profileData : [],
    setProfileData : () =>{
        let url = `${baseUrl}/profile/details`;
        return  axios.get(url,config).then((res)=>{
            if (res.data["status"]==="success"){
                set({profileData:res.data["data"]});
            }else {
                return false;
            }
        }).catch((err)=>{
            return false;
        })
    },
}));


export default userDataStore