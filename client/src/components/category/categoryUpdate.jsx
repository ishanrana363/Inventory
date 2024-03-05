import React, {useEffect, useRef, useState} from 'react';
import {Toaster} from "react-hot-toast";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {errorToast, successToast} from "../../helpers/FormHelper.js";
import {updateBrandDataAlert} from "../../helpers/updateBrandDataAlert.js";
import categoryStore from "../../apiRequest/categoryApi/categoryStoreApi.js";
import {updateCategoryApi} from "../../apiRequest/categoryApi/CategoryApi.js";
import {updateCategoryDataAlert} from "../../helpers/updateCategoryAlert.js";

const CategoryUpdate = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [loder, setLoder] = useState("d-none");
    const {categoryDetails,setCategoryDetails} = categoryStore();
    useEffect(() => {
        (async ()=>{
            setLoder("");
            await setCategoryDetails(id);
            setLoder("d-none");
        })()
    }, [id]);

    const updateCategory= async () => {
        const name = nameRef.current.value;

        const data = { name };

        try {
            const shouldUpdate = await updateCategoryDataAlert(id, data);
            if (!shouldUpdate) {
                navigate("/category/list");
            }

            setLoder("");
            const updateRes = await updateCategoryApi(id,data);
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
                                    <h5>Category Update Page </h5>
                                    <hr className="bg-light"/>

                                    <div className="col-4 p-2">
                                        <label className="form-label">Category Name  </label>
                                        <input defaultValue={categoryDetails.name} ref={nameRef} key={Date.now()}
                                               className="form-control form-control-sm" type="text"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={updateCategory}
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

export default CategoryUpdate;