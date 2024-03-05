import React, { useEffect, useRef, useState } from 'react';
import { Toaster } from "react-hot-toast";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import { useNavigate, useParams } from "react-router-dom";
import customerApiStore from "../../apiRequest/customerApi/customerApiStore.js";
import { updateAlert } from "../../helpers/updateAlert.js";
import { updateCustomerApi } from "../../apiRequest/customerApi/customerApi.js";
import { errorToast, successToast } from "../../helpers/FormHelper.js";

const CustomerUpdate = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState("d-none");
    const { getCustomerDataApi, getCustomerData } = customerApiStore();
    const { id } = useParams();

    useEffect(() => {
        (async () => {
            setLoader("");
            await getCustomerDataApi(id);
            setLoader("d-none");
        })();
    }, [id]);

    const updateCustomerData = async () => {
        const name = nameRef.current.value;
        const phone = phoneRef.current.value;
        const email = emailRef.current.value;
        const address = addressRef.current.value;

        const data = { name, phone, email, address };

        try {
            const shouldUpdate = await updateAlert(id, data);
            if (!shouldUpdate) {
                navigate("/customer/list");
            }

            setLoader("");
            const updateRes = await updateCustomerApi(id, data);
            setLoader("d-none");

            if (updateRes) {
                successToast("Customer update successfully");
                navigate("/customer/list");
            } else {
                errorToast("Customer update fail");
            }
        } catch (error) {

            errorToast("Something went wrong");
        }
    };

    const nameRef = useRef();
    const phoneRef = useRef();
    const emailRef = useRef();
    const addressRef = useRef();

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <h5>Update Customer</h5>
                                    <hr className="bg-light" />
                                    <div className="col-4 p-2">
                                        <label className="form-label">Customer Name</label>
                                        <input defaultValue={getCustomerData["name"]} key={Date.now()} ref={nameRef} className="form-control form-control-sm" type="text" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Mobile No</label>
                                        <input defaultValue={getCustomerData["phone"]} key={Date.now()} ref={phoneRef} className="form-control form-control-sm" type="text" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Email</label>
                                        <input defaultValue={getCustomerData["email"]} key={Date.now()} readOnly ref={emailRef} className="form-control form-control-sm" type="text" />
                                    </div>
                                    <div className="col-12 p-2">
                                        <label className="form-label">Address</label>
                                        <textarea defaultValue={getCustomerData["address"]} key={Date.now()} ref={addressRef} className="form-control form-control-sm" rows={4} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={updateCustomerData} className="btn btn-sm my-3 btn-success">Save Change</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" />
            <FullScreenLoder visibility={loader} />
        </>
    );
};

export default CustomerUpdate;
