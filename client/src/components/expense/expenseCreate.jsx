import React, {useEffect, useState} from 'react';
import {Toaster} from "react-hot-toast";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import expenseTypeStore from "../../apiRequest/expenseTypesApi/expenseTypesStoreApi.js";
import {errorToast, isEmpty, successToast} from "../../helpers/FormHelper.js";
import {createExpenseApi} from "../../apiRequest/expenseApi/expenseApiRequest.js";
import {useNavigate} from "react-router-dom";

const ExpenseCreate = () => {
    const navigate = useNavigate();
    const {expenseTypeDropdown,setExpenseTypeDropdown} = expenseTypeStore();
    const [loder, setLoder] = useState("d-none");
    const [data, setData] = useState({
        typeId : "",
        amount : "",
        note : ""
    });
    const {typeId,amount,note} = data;
    useEffect(() => {
        (async ()=>{
            setLoder("");
            await setExpenseTypeDropdown();
            setLoder("d-none");
        })()
    }, []);

    const getExpenseValue = (name,value) => {
        setData((prevState)=>({
            ...prevState,
            [name] : value
        }))
    };

    const submitExpenseValue = async () => {
        setLoder("");
        let resp = await createExpenseApi(data);
        setLoder("d-none");
        if (resp){
            navigate("/expense/list")
            successToast("Expense create successfully");
        }else {
            errorToast("Something went worng");
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
                                    <h5>Save Expense</h5>
                                    <hr className="bg-light"/>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Expense Create </label>
                                        <select value={typeId} onChange={(e)=>{getExpenseValue("typeId",e.target.value)}}
                                                className="form-select form-select-sm">
                                            <option value="">Select Type</option>
                                            {
                                                expenseTypeDropdown.map((item,i)=>{
                                                    return(
                                                        <option key={i.toLocaleString()} value={item._id}>{item.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Expense Amount</label>
                                        <input value={amount} onChange={(e)=>{getExpenseValue("amount",parseInt(e.target.value)   )}}
                                               className="form-control form-control-sm" type="number"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Expense Note</label>
                                        <input value={note} onChange={(e)=>{getExpenseValue("note",e.target.value)}}
                                            className="form-control form-control-sm" type="text"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={submitExpenseValue}  className="btn btn-sm my-3 btn-success">Save Change</button>
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

export default ExpenseCreate;