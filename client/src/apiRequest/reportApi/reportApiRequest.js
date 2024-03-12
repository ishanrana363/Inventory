import axios from "axios";
import {getToken} from "../../helpers/SessionHelper.js";
const baseUrl = `http://localhost:5050/api/v1`;
import {create} from "zustand";

const config = {
    headers : {
        "token" : getToken()
    }
};

const reportStore = create((set)=>({
    reportData : [],
    setReportData : (fromDate,toDate)=>{
        let postBody={"formDate":FormData+"T00:00:00.000+00:00","toDate":toDate+"T00:00:00.000+00:00"};
        let url = `${baseUrl}/expense/report`
        return axios.post(url,postBody, config)
            .then((res)=>{
                if (res.data.status === "success"){
                    set({reportData: res.data["data"]});
                } else {
                    return false;
                }
            }).catch((err)=>{
                console.error("Error fetching report data:", err);
                return false;
            });
    },
    purchaseReportData : [],
    setPurchaseReportData : (fromDate,toDate)=>{
        let PostBody={"formDate":FormData+"T00:00:00.000+00:00","toDate":toDate+"T00:00:00.000+00:00"};
        let url = `${baseUrl}/purchase/report`
        return axios.post(url,PostBody, config)
            .then((res)=>{
                if (res.data.status === "success"){
                    set({purchaseReportData: res.data["data"]});
                } else {
                    return false;
                }
            }).catch((err)=>{
                return false;
            });
    },
    returnReportData : [],
    setReturnReportData : (fromDate,toDate)=>{
        let PostBody={"formDate":FormData+"T00:00:00.000+00:00","toDate":toDate+"T00:00:00.000+00:00"};
        let url = `${baseUrl}/return/report`
        return axios.post(url,PostBody, config)
            .then((res)=>{
                if (res.data.status === "success"){
                    set({returnReportData: res.data["data"]});
                } else {
                    return false;
                }
            }).catch((err)=>{
                return false;
            });
    },
    salesReportData : [],
    setSalesReportData : (fromDate,toDate)=>{
        let postBody={"formDate":FormData+"T00:00:00.000+00:00","toDate":toDate+"T00:00:00.000+00:00"};        let url = `${baseUrl}/sales/report`
        return axios.post(url,postBody, config)
            .then((res)=>{
                if (res.data.status === "success"){
                    set({salesReportData: res.data["data"]});
                } else {
                    return false;
                }
            }).catch((err)=>{
                return false;
            });
    },
}));



export default reportStore;