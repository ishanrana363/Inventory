import React, {useEffect, useState} from 'react';
import categoryStore from "../../apiRequest/categoryApi/categoryStoreApi.js";
import brandStore from "../../apiRequest/brandApi/brandStroreApiRequest.js";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import {errorToast, isEmpty, successToast} from "../../helpers/FormHelper.js";
import {Toaster} from "react-hot-toast";
import {createProductApi} from "../../apiRequest/productApi/productApiRequest.js";
import {useNavigate} from "react-router-dom";

const ProductCreate = () => {
    const {categoryDropDown,setCategoryDropDown} = categoryStore();
    const {brandDropDown,setBrandDropDown} = brandStore();
    const navigate = useNavigate();
    const [loder, setLoder] = useState("d-none");
    const [data, setData] = useState({
        categoryId : "",
        brandId : "",
        name : "",
        unit:"",
        details:""
    });
    const {categoryId,brandId,name,unit,details} = data;

    useEffect(() => {
        (async ()=>{
            setLoder("");
            await setCategoryDropDown();
            setLoder("d-none");
            setLoder("");
            await setBrandDropDown();
            setLoder("d-none");
        })()

    }, []);
    const getProductInputValue = (name,value) => {
        setData((prevState)=>({
            ...prevState,
            [name] : value
        }))
    };
    const submitProductValue = async () => {
        if (isEmpty(name)){
            errorToast("Product name required");
        }else if (isEmpty(brandId)){
            errorToast("Brand name required");
        }else if (isEmpty(categoryId)){
            errorToast("Category name required");
        }else if (isEmpty(unit)){
            errorToast("Product unit required");
        }else if (isEmpty(details)){
            errorToast("Product details required");
        }else {
            setLoder("");
            let res = await createProductApi(data);
            setLoder("d-none");
            if (res){
                navigate("/product/list");
                successToast("Product create successfully");
            }else {
                errorToast("Something went worng");
            }
        }
    };
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    <h5>Save Product Type</h5>
                                    <hr className="bg-light"/>

                                    <div className="col-md-4  p-2">
                                        <label className="form-label">Product Name</label>
                                        <input value={name} onChange={(e)=>{getProductInputValue("name",e.target.value)}}
                                            className="form-control form-control-sm" type="text"/>
                                    </div>


                                    <div className="col-md-4  p-2">
                                        <label className="form-label">Product Brand</label>
                                        <select value={brandId} onChange={(e)=>{getProductInputValue("brandId",e.target.value)}}
                                            className="form-select form-select-sm">
                                            <option value="">Select Brand</option>
                                            {
                                                brandDropDown.map((item,i)=>{
                                                    return (
                                                        <option key={i.toLocaleString()} value={item["_id"]}> { item["name"] } </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>


                                    <div className="col-md-4  p-2">
                                        <label className="form-label">Product Category</label>
                                        <select value={categoryId} onChange={(e)=>{getProductInputValue("categoryId",e.target.value)}}
                                            className="form-select form-select-sm">
                                            <option value="">Select Category</option>
                                            {
                                                categoryDropDown.map((item,i)=> {
                                                    return (
                                                        <option key={i.toLocaleString()} value= {item["_id"]} >{item["name"]}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>


                                    <div className="col-md-4 p-2">
                                        <label className="form-label">Unit</label>
                                        <input value={unit} onChange={(e)=>{getProductInputValue("unit",e.target.value)}}
                                            className="form-control form-control-sm" type="text"/>
                                    </div>

                                    <div className="col-md-4  p-2">
                                        <label className="form-label">Details</label>
                                        <input value={details} onChange={(e)=>{getProductInputValue("details",e.target.value)}}
                                            className="form-control form-control-sm" type="text"/>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-4  p-2">
                                        <button onClick={submitProductValue} className="btn btn-sm my-3 btn-success">
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FullScreenLoder visibility = {loder} />
            <Toaster position="top-center"
            />
        </>
    );
};

export default ProductCreate;