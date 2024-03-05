import React, {useEffect, useRef, useState} from 'react';
import {Toaster} from "react-hot-toast";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import expenseTypeStore from "../../apiRequest/expenseTypesApi/expenseTypesStoreApi.js";
import expenseStore from "../../apiRequest/expenseApi/expenseApiStore.js";
import {useNavigate, useParams} from "react-router-dom";
import {expenseTypesUpdateAlert} from "../../helpers/expenseTypesUpdateAlert.js";
import {updateExpenseTypesApi} from "../../apiRequest/expenseTypesApi/expenseTypesApi.js";
import {errorToast, successToast} from "../../helpers/FormHelper.js";
import {expenseUpdateAlert} from "../../helpers/expenseUpdateAlert.js";
import {updateExpenseApi} from "../../apiRequest/expenseApi/expenseApiRequest.js";

const ExpenseUpdate = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {expenseTypeDropdown,setExpenseTypeDropdown,} = expenseTypeStore();
    const {expenseDetails,setExpenseDetails} = expenseStore();
    const [loder, setLoder] = useState("d-none");
    useEffect(() => {
        (async ()=>{
            setLoder("");
            await setExpenseTypeDropdown();
            await setExpenseDetails(id)
            setLoder("d-none");

        })()
    }, [id]);
    const updateExpense = async () => {
        const typeId = typeIdRef.current.value;
        const amount = amountRef.current.value;
        const note = noteRef.current.value;
        const data = { typeId,amount,note };

        try {
            const shouldUpdate = await expenseUpdateAlert(id, data);
            if (!shouldUpdate) {
                navigate("/expense/list");
            }

            setLoder("");
            const updateRes = await updateExpenseApi(id,data);
            setLoder("d-none");

            if (updateRes) {
                successToast("Expense update successfully");
                navigate("/expense/list");
            } else {
                errorToast("Expense update fail");
            }
        } catch (error) {

            errorToast("Something went wrong");
        }
    };
    const typeIdRef = useRef();
    const amountRef = useRef();
    const noteRef = useRef();
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
                                        <select defaultValue={expenseDetails.typeId} key={Date.now()} ref={typeIdRef}
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
                                        <input key={Date.now()} defaultValue={expenseDetails.amount} ref={amountRef}
                                               className="form-control form-control-sm" type="number"/>
                                    </div>
                                    <div className="col-4 p-2">
                                        <label className="form-label">Expense Note</label>
                                        <input key={Date.now()} defaultValue={expenseDetails.note} ref={noteRef}
                                               className="form-control form-control-sm" type="text"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={updateExpense}  className="btn btn-sm my-3 btn-success">Update</button>
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

export default ExpenseUpdate;