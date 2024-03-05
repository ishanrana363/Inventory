import React, {useEffect, useRef, useState} from 'react';
import {Toaster} from "react-hot-toast";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import {updateAlert} from "../../helpers/updateAlert.js";
import {updateCustomerApi} from "../../apiRequest/customerApi/customerApi.js";
import {errorToast, successToast} from "../../helpers/FormHelper.js";
import supplierStore from "../../apiRequest/supplierApi/supplierStoreApi.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {supplierUpdateApi} from "../../apiRequest/supplierApi/supplierApiRequest.js";

const SupplierUpdate = () => {
    const [loder, setLoder] = useState("d-none");
    const {id} = useParams();
    const navigate = useNavigate();
    const {supplierDetails,setSupplierDetails} = supplierStore();
    useEffect(() => {
        (async ()=>{
            await setSupplierDetails(id)
        })()
    }, [id]);
    const updateSupplierData = async () => {
        const name = nameRef.current.value;
        const phone = phoneRef.current.value;
        const email = emailRef.current.value;
        const address = addressRef.current.value;

        const data = { name, phone, email, address };

        try {
            const shouldUpdate = await updateAlert(id, data);
            if (!shouldUpdate) {
                navigate("/supplier/list");
            }

            setLoder("");
            const updateRes = await supplierUpdateApi(id,data);
            setLoder("d-none");

            if (updateRes) {
                successToast("Supplier update successfully");
                navigate("/supplier/list");
            } else {
                errorToast("Supplier update fail");
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
                                    <h5>Supplier Update</h5>
                                    <hr className="bg-light" />
                                    <div className="col-4 p-2">
                                        <label className="form-label">Customer Name</label>
                                        <input defaultValue={supplierDetails["name"]} key={Date.now()} ref={nameRef} className="form-control form-control-sm" type="text" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Mobile No</label>
                                        <input defaultValue={supplierDetails["phone"]} key={Date.now()} ref={phoneRef} className="form-control form-control-sm" type="text" />
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Email</label>
                                        <input defaultValue={supplierDetails["email"]} key={Date.now()} readOnly ref={emailRef} className="form-control form-control-sm" type="text" />
                                    </div>
                                    <div className="col-12 p-2">
                                        <label className="form-label">Address</label>
                                        <textarea defaultValue={supplierDetails["address"]} key={Date.now()} ref={addressRef} className="form-control form-control-sm" rows={4} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={updateSupplierData} className="btn btn-sm my-3 btn-success"> Update </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-center" />
            <FullScreenLoder visibility={loder} />
        </>
    );
};

export default SupplierUpdate;