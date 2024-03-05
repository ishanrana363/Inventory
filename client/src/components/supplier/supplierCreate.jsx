import React, {useState} from 'react';
import {Toaster} from "react-hot-toast";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import {errorToast, isEmail, isEmpty, successToast} from "../../helpers/FormHelper.js";
import {createCustomerApi} from "../../apiRequest/customerApi/customerApi.js";
import {supplierCreateApi} from "../../apiRequest/supplierApi/supplierApiRequest.js";

const SupplierCreate = () => {
    const [loder, setLoder] = useState("d-none");
    const [data, setData] = useState({
        name : "",
        address : "",
        phone : "",
        email : "",
    });

    const {name,address,phone,email} = data;
    const getCustomerInputValue = (name,value) => {
        setData((prevState)=>({
            ...prevState,
            [name] : value
        }))
    };

    const submitCustomerValue = async () => {
        if(isEmpty(name)){
            errorToast("Name required");
        }else if (isEmpty(phone)){
            errorToast("Phone required");
        }else if (isEmail(email)){
            errorToast("Email required");
        }else if (isEmpty(address)){
            errorToast("Address required");
        }else {
            setLoder("");
            let res = await supplierCreateApi(data);
            setLoder("d-none");
            if (res){
                successToast("Supplier create successfully");
            }else {
                errorToast("something went worng");
            }
        }
    };

    return (
        <>
            <div className="container mt-5  ">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <h5 >Create Supplier</h5>
                                    <hr className="bg-light"/>

                                    <div className="col-4 p-2">
                                        <label className="form-label">Supplier Name</label>
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

export default SupplierCreate;