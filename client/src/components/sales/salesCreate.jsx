import React, {useEffect, useRef, useState} from 'react';
import {BsCartCheck, BsTrash} from "react-icons/bs";
import {errorToast, isEmpty, successToast} from "../../helpers/FormHelper.js";
import {Toaster} from "react-hot-toast";
import store from "../../redux/store/store.js";
import {removeSaleItemList, setSaleItemList} from "../../redux/stateSlice/salesSlice.js";
import {useSelector} from "react-redux";
import purchaseStore from "../../apiRequest/purchase/purchaseStore.js";
import salesStore from "../../apiRequest/salesApi/salesApiStore.js";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import {salesCreateApi} from "../../apiRequest/salesApi/salesApiRequest.js";

const SalesCreate = () => {
    let productRef,qtyRef,uniCostRef = useRef();
    const saleItemList = useSelector((state)=>state.sales.saleItemList);
    const {customerDropDown,setCustomerDropDown} = salesStore();
    const {productDropDown,setProductDropDown} = purchaseStore();
    const [loder, setLoder] = useState("d-none");
    const [data, setData] = useState({
        vatTax : "",
        discount : "",
        otherCost :"",
        shippingCost:"",
        grandTotal :"",
        note :"",
        customerId : ""
    });

    useEffect(() => {
        (async ()=>{
            setLoder("");
            await setCustomerDropDown();
            setLoder("d-none");
            setLoder("");
            await setProductDropDown();
            setLoder("d-none");
        })()
    }, []);

    const onAddToCart = () => {
        let productValue = productRef.value;
        let productName = productRef.selectedOptions[0].text;
        let qtyValue = qtyRef.value;
        let uniCostValue = uniCostRef.value;
        if (isEmpty(productValue)){
            errorToast("Product select");
        }else if (isEmpty(qtyValue)){
            errorToast("Qty required");
        }else if (isEmpty(uniCostValue)){
            errorToast("uniCostValue value required ");
        }else {
            let item = {
                "productID" : productValue,
                "productName" : productName,
                "qty" : qtyValue,
                "uniCost" : uniCostValue,
                "total" : (parseInt(qtyValue)* parseInt(uniCostValue))
            }
            store.dispatch(setSaleItemList(item));
        }
    };

    const {vatTax,discount,otherCost,shippingCost,grandTotal,note,customerId} = data;
    const getInputValue = (name,value) => {
        setData((prevState)=>({
            ...prevState,
            [name] : value
        }))
    };

    const removeCart =  (i) => {
         store.dispatch(removeSaleItemList(i));
    };


    const submitSalesValue = async () => {
        if (isEmpty(customerId)){
            errorToast("Product required");
        }else if (isEmpty(vatTax)){
            errorToast(" Vat required ");
        }else if (isEmpty(otherCost)){
            errorToast("Other cost required ");
        }else if (isEmpty(shippingCost)){
            errorToast("Shipping cost required ");
        }else if (isEmpty(grandTotal)) {
            errorToast("Grand total required");
        }else if (isEmpty(note)){
            errorToast("Note required");
        }else {
            setLoder("");
            let res = await salesCreateApi(data,saleItemList);
            setLoder("d-none");
            if (res){
                successToast("Sales create success");
            }else {
                errorToast("Something went worng");
            }
        }
    }

    return (
        <>
            <div className={"container-fluid"} >
                <div className="row" >
                    <div className={"col-md-4 col-lg-4 col-12 mt-5 "} >
                        <div className={"card h-100 "} >
                            <div className={"card-body"} >
                                <div className={"row"}>
                                    <h3>Sales Create</h3>
                                    <hr className={"bg-light"}/>
                                    <div className="col-12 p-1">
                                        <label className="form-label">Customer</label>
                                        <select value={customerId} onChange={(e) => {
                                            getInputValue("customerId", e.target.value)
                                        }}
                                                className="form-select form-select-sm">
                                            <option value="">Select Customer</option>
                                            {
                                                customerDropDown.map((cus, i) => {
                                                    return (
                                                        <option value={cus["_id"]}
                                                                key={i.toLocaleString()}> {cus.name}  </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className={"col-12 p-2 "}>
                                        <label className={"form-label"}>VatTax</label> <br/>
                                        <input value={vatTax} onChange={(e) => {
                                            getInputValue("vatTax", e.target.value)
                                        }}
                                               type={"number"} placeholder={"VatTax"}
                                               className={"form-control form-control-sm animated fadeInLeft "}/>
                                    </div>
                                    <div className={"col-12 p-2 "}>
                                        <label className={"form-label"}>discount</label> <br/>
                                        <input value={discount} onChange={(e) => {
                                            getInputValue("discount", e.target.value)
                                        }}
                                               type={"number"} placeholder={"discount"}
                                               className={"form-control form-control-sm animated fadeInRight "}/>
                                    </div>
                                    <div className={"col-12 p-2 "}>
                                        <label className={"form-label"}>otherCost</label> <br/>
                                        <input value={otherCost} onChange={(e) => {
                                            getInputValue("otherCost", e.target.value)
                                        }}
                                               type={"number"} placeholder={"otherCost"}
                                               className={"form-control form-control-sm animated fadeInLeft "}/>
                                    </div>
                                    <div className={"col-12 p-2 "}>
                                        <label className={"form-label"}>shippingCost</label> <br/>
                                        <input value={shippingCost} onChange={(e) => {
                                            getInputValue("shippingCost", e.target.value)
                                        }}
                                               type={"number"} placeholder={"otherCost"}
                                               className={"form-control form-control-sm animated fadeInLeft "}/>
                                    </div>
                                    <div className={"col-12 p-2 "}>
                                        <label className={"form-label"}>grandTotal</label> <br/>
                                        <input value={grandTotal} onChange={(e) => {
                                            getInputValue("grandTotal", e.target.value)
                                        }}
                                               type={"number"} placeholder={"Total"}
                                               className={"form-control form-control-sm animated fadeInRight "}/>
                                    </div>
                                    <div className={"col-12 p-2 "}>
                                        <label className={"form-label"}>Note</label> <br/>
                                        <input value={note} onChange={(e) => {
                                            getInputValue("note", e.target.value)}}
                                               type={"text"} placeholder={"note"}
                                               className={"form-control form-control-sm animated fadeInRight "}/>
                                    </div>
                                    <div className={"col-12 p-2 "}>
                                        <button onClick={submitSalesValue}
                                                className={"btn btn-danger animated fadeInLeft "}>
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-12 col-md-8 col-lg-8 mt-5 "}>
                        <div className={"card h-100 "}>
                            <div className={"card-body"}>
                                <div className={"row"}>
                                    <div className="col-md-6 p-1">
                                        <label className="form-label  ">Select Product</label>
                                        <select ref={(ref)=>productRef=ref} className="form-select form-select-sm animated fadeInLeft ">
                                            <option className={" "} value="">Select Product</option>
                                            {
                                                productDropDown.map((item,i)=>{
                                                    return (
                                                        <option key={i.toLocaleString()} value={item["_id"]}> { item["name"] } </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className={"col-md-2"}>
                                        <label className="form-label">Qty </label>
                                        <input ref={(ref)=>qtyRef=ref} type={"number"} className={"form-control animated fadeInRight "}/>
                                    </div>
                                    <div className={"col-md-2"}>
                                        <label className="form-label">uniCost </label>
                                        <input ref={(ref)=>uniCostRef=ref} type={"number"}
                                            className={"form-control animated fadeInLeft "}/>
                                    </div>
                                    <div className="col-md-2 p-1">
                                        <label className="form-label">Add to cart</label>
                                        <button onClick={onAddToCart}
                                            className="btn w-100 btn-success btn-sm animated fadeInRight ">
                                            <BsCartCheck/>
                                        </button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="table-responsive table-section">
                                            <table className="table-sm text-center table">
                                                <thead className="sticky-top bg-white">
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Qty</th>
                                                    <th>Unit Price</th>
                                                    <th>Total</th>
                                                    <th>Remove</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {
                                                    saleItemList.map((item,i)=>{
                                                        return(
                                                            <tr>
                                                                <td>{item.productName}</td>
                                                                <td>{item.qty}</td>
                                                                <td>{item.uniCost}</td>
                                                                <td>{item.total}</td>
                                                                <td><button onClick={removeCart.bind(this,i)} className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2"><BsTrash/></button></td>
                                                            </tr>
                                                        )
                                                    })
                                                }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <FullScreenLoder visibility={loder}/>
            <Toaster position="top-center"/>
        </>
    );
};

export default SalesCreate;