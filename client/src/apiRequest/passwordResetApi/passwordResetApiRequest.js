import axios from "axios";
const baseUrl = `http://localhost:5050/api/v1`
export const sendEmailUserApi = async (email) => {
    try {
        let res = await axios.get(`${baseUrl}/send/email/${email}`);
        if (res.data["status"]==="success"){
            return res.data["status"];
        }else {
            return false;
        }
    }catch (e) {
        return false;
    }
};


export const userOtpVerifyApi = async (email,otp) => {
    try {
        let res = await axios.get(`${baseUrl}/otp/verify/${email}/${otp}`);
        if (res.data["status"]==="success"){
            return res.data["status"];
        }else {
            return false;
        }
    }catch (e) {
        return false;
    }
};

export const newPasswordSetApi = async (postBody) => {
    try {
        let res = await axios.post(`${baseUrl}/password/reset`,postBody);
        if (res.data["status"]==="success"){
            return res.data["status"];
        }else {
            return false;
        }
    }catch (e) {
        return false;
    }
};
