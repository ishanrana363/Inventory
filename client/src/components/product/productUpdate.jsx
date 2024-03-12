import React, { useEffect, useRef, useState } from 'react';
import { Toaster } from "react-hot-toast";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import productStore from "../../apiRequest/productApi/productApiStore.js";
import { useNavigate, useParams } from "react-router-dom";
import { errorToast, successToast } from "../../helpers/FormHelper.js";
import {productUpdateAlert} from "../../helpers/productUpdateAlert.js";
import {updateProductApi} from "../../apiRequest/productApi/productApiRequest.js";

const ProductUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loader, setLoader] = useState("d-none");
    const { productDetailsDropDown, setProductDetailsDropDown } = productStore();
    useEffect(() => {
        (async () => {
            setLoader("");
            await setProductDetailsDropDown(id);
            setLoader("d-none");
        })()
    }, [id]);

    const updateProductData = async () => {
        const name = nameRef.current.value;
        const unit = unitRef.current.value;
        const details = detailsRef.current.value;

        const data = { name, unit, details };

        try {
            const shouldUpdate = await productUpdateAlert (id, data);
            if (!shouldUpdate) {
                errorToast("Product update fail")
                navigate("/product/list");
            }else {
                setLoader("");
                const updateRes = await updateProductApi(id, data);
                setLoader("d-none");

                if (updateRes) {
                    successToast("Product update successfully");
                    navigate("/product/list");
                } else {
                    errorToast("Product update fail");
                }
            }
        } catch (error) {
            errorToast("Something went wrong");
        }
    };

    const nameRef = useRef();
    const unitRef = useRef();
    const detailsRef = useRef();

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <h5> Product Update Page </h5>
                                    <hr className="bg-light" />
                                    {productDetailsDropDown && productDetailsDropDown.map((item, i) => (
                                        <div key={i}>
                                            <div className="row">
                                                <div className="col-md-4 p-2">
                                                    <label className="form-label">Category Name </label>
                                                    <input
                                                        className="form-control form-control-sm" key={Date.now()}
                                                        readOnly={true}
                                                        type="text" defaultValue={item["category"]["name"]}/>
                                                </div>
                                                <div className="col-md-4 p-2">
                                                    <label className="form-label">Brand Name </label>
                                                    <input
                                                        className="form-control form-control-sm" key={Date.now()}
                                                        readOnly={true}
                                                        type="text" defaultValue={item["brand"]["name"]}/>
                                                </div>
                                                <div className="col-md-4 p-2">
                                                    <label className="form-label">Product Name </label>
                                                    <input ref={nameRef}
                                                        className="form-control form-control-sm" key={Date.now()}
                                                        type="text" defaultValue={item["name"]}/>
                                                </div>
                                                <div className="col-md-4 p-2">
                                                    <label className="form-label">Unit</label>
                                                    <input ref={unitRef}
                                                        className="form-control form-control-sm" key={Date.now()}
                                                        type="text" defaultValue={item["unit"]}/>
                                                </div>
                                                <div className="col-md-4 p-2">
                                                    <label className="form-label">Details</label>
                                                    <input ref={detailsRef}
                                                        className="form-control form-control-sm" key={Date.now()}
                                                        type="text" defaultValue={item["details"]}/>
                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                                <div className="row">
                                    <div className="col-md-4 p-2">
                                        <button onClick={updateProductData}
                                                className="btn btn-sm my-3 btn-success">Update
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="top-center"/>
            <FullScreenLoder visibility={loader}/>
        </>
    );
};

export default ProductUpdate;
