import axios from "axios";
import {create} from "zustand";
const baseUrl = `http://localhost:5050/api/v1`;

const footerStore = create((set)=>({
    footerData : [],
    setFooterData : async (type)=>{
        let url = `${baseUrl}/legal/${type}`;
        let res = await axios.get(url);
        if (res.data["status"]==="success"){
            set({footerData:res.data["data"]});
        }
    }
}));


export default footerStore;