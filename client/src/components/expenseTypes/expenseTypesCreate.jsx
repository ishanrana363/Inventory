import React, {useState} from 'react';
import {Toaster} from "react-hot-toast";
import FullScreenLoder from "../../components/layout/FullScreenLoder.jsx";
import {errorToast, isEmpty, successToast} from "../../helpers/FormHelper.js";
import {createExpenseTypesApi} from "../../apiRequest/expenseTypesApi/expenseTypesApi.js";
import {useNavigate} from "react-router-dom";

const ExpenseTypesCreate = () => {
    const navigate = useNavigate();
    const [loder, setLoder] = useState("d-none");
    const [data, setData] = useState({
        name : ""
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
            errorToast("Expense types name required");
        }else {
            setLoder("");
            let res = await createExpenseTypesApi(data);
            setLoder("d-none");
            if (res){
                navigate("/expense/type/list")
                successToast("Expense types create successfully");
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
                                    <h5>Expense Type Create </h5>
                                    <hr className="bg-light"/>

                                    <div className="col-4 p-2">
                                        <label className="form-label">Expense Type Name</label>
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

export default ExpenseTypesCreate;