import React, {useState} from 'react';
import {Toaster} from "react-hot-toast";
import FullScreenLoder from "../../components/layout/FullScreenLoder.jsx";
import {errorToast, isEmpty, successToast} from "../../helpers/FormHelper.js";
import {createCategoryApi} from "../../apiRequest/categoryApi/CategoryApi.js";

const CreateCategory = () => {
    const [loder, setLoder] = useState("d-none");
    const [data, setData] = useState({
        name:""
    });
    const {name} = data;
    const getCustomerInputValue = (name,value) => {
        setData((prevState)=>({
            ...prevState,
            [name] : value
        }))
    };
    const submitCustomerValue = async () => {
        if (isEmpty(name)){
            errorToast("Category name required");
        }else {
            setLoder("");
            let res = await createCategoryApi(data);
            setLoder("d-none");
            if (res){
                successToast("Category create successfully");
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
                                    <h5 >Category Create</h5>
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
                                                className="btn btn-sm my-3 btn-success"> Create
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

export default CreateCategory;