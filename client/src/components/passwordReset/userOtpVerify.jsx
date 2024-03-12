import React, {useState} from 'react';
import {Toaster} from "react-hot-toast";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import {errorToast, isEmail, isEmpty, successToast} from "../../helpers/FormHelper.js";
import {userOtpVerifyApi} from "../../apiRequest/passwordResetApi/passwordResetApiRequest.js";

const UserOtpVerify = () => {
    const [loder, setLoder] = useState("d-none")
    const [data, setData] = useState({
        email : "",
        otp : ""
    });
    const {email,otp} = data;
    const getUserInputValue = (name,value) => {
        setData((prevState)=>({
            ...prevState,
            [name] : value
        }))
    };

    const submitUserValue =async () => {
        if (isEmail(email)){
            errorToast("Email required");
        }else if (isEmpty(otp)){
            errorToast("Otp required");
        }else {
            setLoder("");
            let res = await userOtpVerifyApi(email,otp);
            setLoder("d-none");
            if (res){
                successToast("Otp verify successfully");
            }else {
                errorToast("Otp verify fail ");
            }
        }
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-6 center-screen">
                        <div className="card w-90  p-4">
                            <div className="card-body">
                                <h4 className="animated fadeInUpBig ">EMAIL ADDRESS</h4>
                                <br/>
                                <input value={email} onChange={(e) => {
                                    getUserInputValue("email", e.target.value)
                                }}
                                       placeholder="User Email"
                                       className="form-control animated fadeInRight" type="email"/>
                                <br/>
                                <input value={otp} onChange={(e) => {
                                    getUserInputValue("otp", e.target.value)
                                }}
                                       placeholder="Otp"
                                       className="form-control animated fadeInRight" type="number"/>
                                <br/>
                                <button onClick={submitUserValue}
                                        className="btn w-100 animated fadeInLeft float-end btn-success">Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-center"/>
            <FullScreenLoder visibility={loder}/>
        </>
    );
};

export default UserOtpVerify;