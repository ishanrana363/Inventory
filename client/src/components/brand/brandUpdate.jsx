import React, {useEffect, useRef, useState} from 'react';
import {Toaster} from "react-hot-toast";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import brandStore from "../../apiRequest/brandApi/brandStroreApiRequest.js";
import {useNavigate, useParams} from "react-router-dom";
import {expenseTypesUpdateAlert} from "../../helpers/expenseTypesUpdateAlert.js";
import {updateExpenseTypesApi} from "../../apiRequest/expenseTypesApi/expenseTypesApi.js";
import {errorToast, successToast} from "../../helpers/FormHelper.js";
import {updateBrandDataAlert} from "../../helpers/updateBrandDataAlert.js";
import {updateBrandApi} from "../../apiRequest/brandApi/brandApi.js";

const BrandUpdate = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [loder, setLoder] = useState("d-none");
    const {brandDetails,setBrandDetails} = brandStore();
    useEffect(() => {
        (async ()=>{
            setLoder("");
            await setBrandDetails(id);
            setLoder("d-none");
        })()
    }, [id]);

    const updateBrandData = async () => {
        const name = nameRef.current.value;

        const data = { name };

        try {
            const shouldUpdate = await updateBrandDataAlert(id, data);
            if (!shouldUpdate) {
                navigate("/brand/list");
            }

            setLoder("");
            const updateRes = await updateBrandApi(id,data);
            setLoder("d-none");

            if (updateRes) {
                successToast("Brand update successfully");
                navigate("/brand/list");
            } else {
                errorToast("Brand update fail");
            }
        } catch (error) {

            errorToast("Something went wrong");
        }
    };
    const nameRef = useRef();

    return (
        <>
            <div className="container mt-5  ">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <h5>Brand Update Page </h5>
                                    <hr className="bg-light"/>

                                    <div className="col-4 p-2">
                                        <label className="form-label">Brand Name  </label>
                                        <input defaultValue={brandDetails.name} ref={nameRef} key={Date.now()}
                                               className="form-control form-control-sm" type="text"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={updateBrandData}
                                                className="btn btn-sm my-3 btn-success"> Update
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

export default BrandUpdate;