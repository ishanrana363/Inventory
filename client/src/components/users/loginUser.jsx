import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {errorToast, isEmail, successToast} from "../../helpers/FormHelper.js";
import {userLoginApi} from "../../apiRequest/userApi/userApiRequest.js";
import {Toaster} from "react-hot-toast";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";

const LoginUser = () => {
    const [loder, setLoder] = useState("d-none");
    const [data, setData] = useState({
        email : "",
        password : "",
        confirmPassword:""
    });
    const {email,password,confirmPassword} = data;

    const getInputValue = (name,value) => {
        setData((prev)=>({
            ...prev,
            [name] : value
        }))
    };
    const navigate = useNavigate();
    const submitUserValue = async () => {
        if (isEmail(email)){
            errorToast("Email required");
        }else if (password!==confirmPassword){
            errorToast("Password and confirm password not match.Please provide correct password");
        }else {
            setLoder("");
            let res = await userLoginApi(data);
            setLoder("d-none");
            if (res){
                window.location.href="/"
                successToast("User login successfully");
            }else {
                errorToast("User login fail");
            }
        }
    };
    return (
        <>
            <div className="container ">
                <div className="row justify-content-center ">
                    <div className="col-md-7 col-lg-6 center-screen ">
                        <div className="card w-90  p-4">
                            <div className="card-body ">
                                <h4 className="animated fadeInUpBig ">SIGN IN</h4>
                                <br/>
                                <input value={email} onChange={(e) => {
                                    getInputValue("email", e.target.value)
                                }} placeholder="Email" className="form-control animated fadeInLeftBig" type="email"/>
                                <br/>
                                <input value={password} onChange={(e)=>{ getInputValue("password",e.target.value) }}
                                    placeholder="Password" className="form-control animated fadeInRight"
                                    type="password"/>
                                <br/>
                                <input value={confirmPassword} onChange={(e)=>{ getInputValue("confirmPassword",e.target.value) }}
                                    placeholder="Confirm Password" className="form-control animated fadeInRight"
                                    type="password"/>
                                <br/>
                                <button onClick={submitUserValue}
                                        className="btn w-25 bg-success float-start animated fadeInDownBig  ">Next
                                </button>

                                <div className="float-end mt-5">
                                    <span>
                                        <Link className="text-center ms-3 h6 animated fadeInUp" to="/registration">Sign Up </Link>
                                        <span className="ms-1">|</span>
                                        <Link className="text-center ms-3 h6 animated fadeInLeft" to="/send/otp">Forget Password</Link>
                                    </span>

                                </div>

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

export default LoginUser;