import React, {Fragment, useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import store from "../../redux/store/store";
import {OnChangePurchaseInput, RemovePurchaseItem, SetPurchaseItemList} from "../../redux/stateSlice/purchaseSlice.js";
import {
    purchaseCreateApi,
} from "../../apiRequest/purchase/purchaseApi.js" ;
import {errorToast, isEmpty, successToast} from "../../helpers/FormHelper.js";
import {BsCartCheck, BsTrash} from "react-icons/bs";
import {Toaster} from "react-hot-toast";
import purchaseStore from "../../apiRequest/purchase/purchaseStore.js";
const PurchaseCreateUpdate = () => {
    let productRef,qtyRef,unitPriceRef=useRef();
    const {supplierDropDown,setSupplierDropDown,productDropDown,setProductDropDown} = purchaseStore();
    useEffect(()=>{
        (async () => {
            await setProductDropDown();
            await setSupplierDropDown();
        })();
    },[])
    const OnAddCart = () => {
        let productValue=productRef.value;
        let productName=productRef.selectedOptions[0].text;
        let qtyValue=qtyRef.value;
        let unitPriceValue=unitPriceRef.value;

        if(isEmpty(productValue)){
            errorToast("Select Product")
        }
        else if(isEmpty(qtyValue)){
            errorToast("Qty Required")
        }
        else if(isEmpty(unitPriceValue)){
            errorToast("Unit Price Required")
        }
        else {
            let item= {
                "productID":productValue,
                "productName" : productName,
                "qty" : qtyValue,
                "uniCost":unitPriceValue,
                "total":(parseInt(qtyValue))*(parseInt(unitPriceValue))
            }
            store.dispatch(SetPurchaseItemList(item))
        }

    };
    const [data, setData] = useState({
        supplierId : "",
        vatTax : "",
        discount : "",
        otherCost : "",
        shippingCost : "",
        grandTotal : "",
        note : ""
    });
    const {supplierId,vatTax,discount,otherCost,shippingCost,grandTotal,note} = data;
    const getPurchaseInputValue = (name,value) => {
        setData((prevState)=>({
            ...prevState,
            [name] : value
        }))
    };

    let PurchaseItemList=useSelector((state)=>(state.purchase.PurchaseItemList));

    const removeCart = (i) => {
        store.dispatch(RemovePurchaseItem(i))
    }


    const CreateNewPurchase=async () => {
        let res = await purchaseCreateApi(data,PurchaseItemList);
        if (res){
            successToast("create successfully")
        }else {
            errorToast("fail")
        }

    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-4 col-lg-4 mb-3">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row">
                                    <h5 >Create Purchase</h5>
                                    <hr className="bg-light"/>
                                    <div className="col-12 p-1">
                                        <label className="form-label">Supplier</label>
                                        <select value={supplierId} onChange={ (e)=>{getPurchaseInputValue("supplierId",e.target.value)} }
                                                className="form-select form-select-sm">
                                            <option value="">Select Supplier</option>
                                            {
                                                supplierDropDown.map((item,i)=>{
                                                    return( <option key={i.toLocaleString()} value={item._id}>{item.name}</option>)
                                                })
                                            }
                                        </select>
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Vat/Tax</label>
                                        <input value={vatTax} onChange={(e)=>{getPurchaseInputValue("vatTax",e.target.value)}}
                                               className="form-control form-control-sm" type="number"/>
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Discount</label>
                                        <input value={discount} onChange={(e)=>{getPurchaseInputValue("discount",e.target.value)}}
                                            className="form-control form-control-sm" type="number"/>
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Other Cost</label>
                                        <input  value={otherCost} onChange={(e)=>{getPurchaseInputValue("otherCost",e.target.value)}}
                                            className="form-control form-control-sm" type="number"/>
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Shipping Cost</label>
                                        <input value={shippingCost} onChange={(e)=>{getPurchaseInputValue("shippingCost",e.target.value)}}
                                            className="form-control form-control-sm" type="number"/>
                                    </div>

                                    <div className="col-12 p-1">
                                        <label className="form-label">Grand Total</label>
                                        <input value={grandTotal} onChange={(e)=>{getPurchaseInputValue("grandTotal",e.target.value)}}
                                            className="form-control form-control-sm" type="number"/>
                                    </div>


                                    <div className="col-12 p-1">
                                        <label className="form-label">Note</label>
                                        <input  value={note} onChange={(e)=>{getPurchaseInputValue("note",e.target.value)}}
                                            className="form-control form-control-sm" type="text"/>
                                    </div>


                                </div>
                                <div className="row">
                                    <div className="col-4 p-2">
                                        <button onClick={CreateNewPurchase} className="btn btn-sm my-3 btn-success">Create</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 col-lg-8 mb-3">
                        <div className="card  h-100">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-6  p-1">
                                        <label className="form-label">Select Product</label>
                                        <select ref={(input)=>productRef=input} className="form-select form-select-sm">
                                            <option value="">Select Product</option>
                                            {
                                                productDropDown.map((item,i)=>{
                                                    return( <option key={i.toLocaleString()} value={item._id}>{item.name}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-2 p-1">
                                        <label className="form-label">Qty</label>
                                        <input ref={(input)=>qtyRef=input}  className="form-control form-control-sm" />
                                    </div>
                                    <div className="col-2 p-1">
                                        <label className="form-label">Unit Price</label>
                                        <input ref={(input)=>unitPriceRef=input} className="form-control form-control-sm" />
                                    </div>
                                    <div className="col-2 p-1">
                                        <label className="form-label">Add to cart</label>
                                        <button onClick={OnAddCart} className="btn w-100 btn-success btn-sm"><BsCartCheck/></button>
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
                                                    PurchaseItemList.map((item,i)=>{
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
            <Toaster position="top-center"/>
        </>
    );
};

export default PurchaseCreateUpdate;