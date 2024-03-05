import React, {useState} from 'react';
import {errorToast, isEmail, isEmpty, successToast} from "../../helpers/FormHelper.js";
import {Toaster} from "react-hot-toast";
import {createCustomerApi} from "../../apiRequest/customerApi/customerApi.js";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import {useNavigate} from "react-router-dom";

const CustomerCreate = () => {
    const navigate = useNavigate();
    const [loder, setLoder] = useState("d-none");
    const [data, setData] = useState({
        name : "",
        address : "",
        phone : "",
        email:""
    });
    const {name,email,address,phone} = data;
    const getCustomerInputValue = (name,value) => {
        setData((prevState)=>({
            ...prevState,
            [name] : value
        }))
    };
    const submitCustomerValue = async () => {
        if (isEmpty(name)){
            errorToast("Name required");
        }else if (isEmpty(phone)){
            errorToast("Phone required");
        }else if (isEmail(email)){
            errorToast("Email required");
        }else {
            setLoder("");
            let res = await createCustomerApi(data);
            setLoder("d-none");
            if (res){
                navigate("/customer/list")
                successToast("Customer create successfully");
            }else {
                errorToast("Something went worng");
            }

        }
    }
    return (
            <>
                <div className="container mt-5  ">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <h5 >Create Customer</h5>
                                        <hr className="bg-light"/>

                                        <div className="col-4 p-2">
                                            <label className="form-label">Customer Name</label>
                                            <input  value={name} onChange={(e)=>{ getCustomerInputValue("name",e.target.value) }}
                                                className="form-control form-control-sm" type="text"/>
                                        </div>
                                        <div className="col-4 p-2">
                                            <label className="form-label">Mobile No</label>
                                            <input value={phone} onChange={(e)=>{ getCustomerInputValue("phone",e.target.value) }}
                                                className="form-control form-control-sm" type="text"/>
                                        </div>
                                        <div className="col-4 p-2">
                                            <label className="form-label">Email </label>
                                            <input value={email} onChange={(e)=>{ getCustomerInputValue("email",e.target.value) }}
                                                className="form-control form-control-sm" type="text"/>
                                        </div>
                                        <div className="col-12 p-2">
                                            <label className="form-label">Address</label>
                                            <textarea value={address} onChange={(e)=>{ getCustomerInputValue("address",e.target.value) }}
                                                className="form-control form-control-sm" rows={4}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4 p-2">
                                            <button onClick={submitCustomerValue}
                                                className="btn btn-sm my-3 btn-success">Save Change
                                            </button>
                                        </div>
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

export default CustomerCreate;