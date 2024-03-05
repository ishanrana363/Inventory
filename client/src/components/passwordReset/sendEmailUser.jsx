import React, {useState} from 'react';
import {errorToast, isEmail, successToast} from "../../helpers/FormHelper.js";
import {sendEmailUserApi} from "../../apiRequest/passwordResetApiRequest.js";
import {Toaster} from "react-hot-toast";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";

const SendEmailUser = () => {
    const [loder, setLoder] = useState("d-none")
    const [data, setData] = useState({
        email : ""
    });
    const {email} = data;
    const getUserInputValue = (name,value) => {
        setData((prevState)=>({
            ...prevState,
            [name]:value
        }))
    };
    const submitUserValue = async () => {
        if (isEmail(email)){
            errorToast("Provide  email");
        }else {
            setLoder("");
            let res = await sendEmailUserApi(email);
            setLoder("d-none");
            if (res){
                successToast("Email send successfully");
            }else {
                errorToast("Something went worng");
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
                                <input value={email} onChange={(e)=>{ getUserInputValue("email",e.target.value) }}
                                       placeholder="User Email"
                                       className="form-control animated fadeInRight" type="email"/>
                                <br/>
                                <button onClick={submitUserValue}
                                        className="btn w-100 animated fadeInLeft float-end btn-primary">Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-center"/>
            <FullScreenLoder visibility = {loder} />
        </>
    );
};

export default SendEmailUser;