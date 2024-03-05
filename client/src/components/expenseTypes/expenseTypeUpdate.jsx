import React, {useEffect, useRef, useState} from 'react';
import {Toaster} from "react-hot-toast";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import {updateAlert} from "../../helpers/updateAlert.js";
import {supplierUpdateApi} from "../../apiRequest/supplierApi/supplierApiRequest.js";
import {errorToast, successToast} from "../../helpers/FormHelper.js";
import {useNavigate, useParams} from "react-router-dom";
import {expenseTypesUpdateAlert} from "../../helpers/expenseTypesUpdateAlert.js";
import {updateExpenseTypesApi} from "../../apiRequest/expenseTypesApi/expenseTypesApi.js";
import expenseTypeStore from "../../apiRequest/expenseTypesApi/expenseTypesStoreApi.js";

const ExpenseTypeUpdate = () => {
    const {expenseTypeDetails,setExpenseTypeDetails} = expenseTypeStore();
    const {id} = useParams();
    const navigate = useNavigate();
    const [loder, setLoder] = useState("d-none");
    useEffect(() => {
        (async ()=>{
            setLoder("");
            await setExpenseTypeDetails(id);
            setLoder("d-none")
        })()
    }, [id]);
    const updateExpenseTypeData = async () => {
        const name = nameRef.current.value;

        const data = { name };

        try {
            const shouldUpdate = await expenseTypesUpdateAlert(id, data);
            if (!shouldUpdate) {
                navigate("/expense/type/list");
            }

            setLoder("");
            const updateRes = await updateExpenseTypesApi(id,data);
            setLoder("d-none");

            if (updateRes) {
                successToast("Expense type update successfully");
                navigate("/expense/type/list");
            } else {
                errorToast("Expense type update fail");
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
                                        <h5>Expense Type Update </h5>
                                        <hr className="bg-light"/>

                                        <div className="col-4 p-2">
                                            <label className="form-label">Expense Type Name</label>
                                            <input defaultValue={expenseTypeDetails.name} ref={nameRef}
                                                    className="form-control form-control-sm" type="text"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4 p-2">
                                            <button onClick={updateExpenseTypeData}
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

export default ExpenseTypeUpdate;