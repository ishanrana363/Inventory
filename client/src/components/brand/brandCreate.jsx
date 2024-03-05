import React, {useState} from 'react';
import {Toaster} from "react-hot-toast";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import {errorToast, isEmpty, successToast} from "../../helpers/FormHelper.js";
import {createBrandApi} from "../../apiRequest/brandApi/brandApi.js";

const BrandCreate = () => {
    const [loder, setLoder] = useState("d-none");
    const [data, setData] = useState({
        name : ""
    });
    const getCustomerInputValue = (name,value) => {
        setData((prevState)=>({
            ...prevState,
            [name] : value
        }))
    };
    const {name} = data;
    const submitCustomerValue = async () => {
        if (isEmpty(name)){
            errorToast("Name required");
        }else {
            setLoder("");
            let res = await createBrandApi(data);
            setLoder("d-none");
            if (res){
                successToast("Brand create successfully");
            }else {
                errorToast("Something went worng");
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
                                        <h5 >Brand Supplier</h5>
                                        <hr className="bg-light"/>

                                        <div className="col-4 p-2">
                                            <label className="form-label">Brand Name</label>
                                            <input  value={name} onChange={(e)=>{ getCustomerInputValue("name",e.target.value) }}
                                                    className="form-control form-control-sm" type="text"/>
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

export default BrandCreate;