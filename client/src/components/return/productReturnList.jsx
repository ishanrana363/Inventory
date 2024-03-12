import React, {useEffect, useState} from 'react';
import CurrencyFormat from "react-currency-format";
import {Link} from "react-router-dom";
import {AiFillDelete} from "react-icons/ai";
import ReactPaginate from "react-paginate";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import {Toaster} from "react-hot-toast";
import {deleteAlert} from "../../helpers/DeleteAlert.js";
import {errorToast, successToast} from "../../helpers/FormHelper.js";
import productReturnStore from "../../apiRequest/returnApi/returnApiStore.js";
import {returnDeleteApi} from "../../apiRequest/returnApi/returnApiRequest.js";
import moment from "moment/moment.js";

const ProductReturnList = () => {
    const {returnData,totalReturnData,setReturnData} = productReturnStore()
    const [loder, setLoder] = useState("d-none");
    const [searchValue, setSearchValue] = useState(0);
    const [perPage, setPerPage] = useState(5);
    useEffect(() => {
        (async ()=>{
            setLoder("");
            await setReturnData(1,perPage,0);
            setLoder("d-none");
        })()
    }, []);
    const handlePageClick = async (even) => {
        setLoder("");
        await setReturnData(even.selected,perPage,0);
        setLoder("d-none");
    };
    const getPerPageValue = async (even) => {
        setPerPage(parseInt(even.target.value));
        setLoder("");
        await setReturnData(1,even.target.value,0);
        setLoder("d-none");
    };

    const getSearchInputValue = async (even) => {
        setSearchValue(even.target.value);
        if ((even.target.value.length===0)){
            setSearchValue(0);
            setLoder("");
            await setReturnData(1,perPage,0);
            setLoder("d-none");
        }
    };

    const submitSearchValue = async () => {
        setLoder("");
        await setReturnData(1,perPage,0);
        setLoder("d-none");
    };

    const deleteSalesData = async (id) => {
        let deleteResp = await deleteAlert(id);
        if (deleteResp.isConfirmed){
            let resp = await returnDeleteApi(id);
            if (resp){
                successToast("Sales data delete successfully");
                setLoder("");
                await setReturnData(1,perPage,0);
                setLoder("d-none");
            }else {
                errorToast("Sales data delete fail");
            }
        }
    };
    return (
        <>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-4">
                                            <h5>Sales List</h5>
                                        </div>

                                        <div className="col-2">
                                            <input  placeholder="Text Filter" className="form-control form-control-sm"/>
                                        </div>

                                        <div className="col-2">
                                            <select onChange={getPerPageValue}
                                                    className="form-control mx-2 form-select-sm form-select form-control-sm">
                                                <option value="5">5 Per Page</option>
                                                <option value="20">20 Per Page</option>
                                                <option value="30">30 Per Page</option>
                                                <option value="50">50 Per Page</option>
                                                <option value="100">100 Per Page</option>
                                                <option value="100">200 Per Page</option>
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <div className="input-group mb-3">
                                                <input onChange={getSearchInputValue} type="text" className="form-control form-control-sm" placeholder="Search.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                                <button onClick={submitSearchValue} className="btn  btn-success btn-sm mb-0" type="button">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive table-section">
                                                <table className="table ">
                                                    <thead className="sticky-top bg-white">
                                                    <tr>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Number</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Customer</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Grand
                                                            Total
                                                        </td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Shipping
                                                            Cost
                                                        </td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Vat/Tax</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Other
                                                            Cost
                                                        </td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Discount</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</td>
                                                    </tr>
                                                    </thead>
                                                    <tbody>

                                                    {
                                                        returnData.map((item,i)=>{
                                                            return (
                                                                <tr key={i}>
                                                                    <td>
                                                                        <p className="text-xs text-start mt-3 ">{i+1}</p>
                                                                    </td>
                                                                    <td>
                                                                        <p className="text-xs text-start mt-3 ">{item["return"][0]["name"]}</p>
                                                                    </td>

                                                                    <td>
                                                                        <p className="text-xs text-start mt-3 ">
                                                                            <CurrencyFormat value={item["grandTotal"]}
                                                                                            displayType={'text'}
                                                                                            thousandSeparator={true}
                                                                                            prefix={'$'}/>
                                                                        </p>
                                                                    </td>

                                                                    <td>
                                                                        <p className="text-xs text-start mt-3 ">
                                                                            <CurrencyFormat value={item["shippingCost"]}
                                                                                            displayType={'text'}
                                                                                            thousandSeparator={true}
                                                                                            prefix={'$'}/>
                                                                        </p>
                                                                    </td>

                                                                    <td>
                                                                        <p className="text-xs text-start mt-3 ">
                                                                            <CurrencyFormat value={item["vatTax"]}
                                                                                            displayType={'text'}
                                                                                            thousandSeparator={true}
                                                                                            prefix={'$'}/>
                                                                        </p>
                                                                    </td>

                                                                    <td>
                                                                        <p className="text-xs text-start mt-3 ">
                                                                            <CurrencyFormat value={item["otherCost"]}
                                                                                            displayType={'text'}
                                                                                            thousandSeparator={true}
                                                                                            prefix={'$'}/>
                                                                        </p>
                                                                    </td>

                                                                    <td>
                                                                        <p className="text-xs text-start mt-3 ">
                                                                            <CurrencyFormat value={item["discount"]}
                                                                                            displayType={'text'}
                                                                                            thousandSeparator={true}
                                                                                            prefix={'$'}/>
                                                                        </p>
                                                                    </td>


                                                                    <td>
                                                                        <p className="text-xs text-start mt-3 ">{moment(item.createdDate).format('MMMM Do YYYY')}</p>
                                                                    </td>

                                                                    <td>
                                                                        <Link to={""} title={"Delete"} >
                                                                            <button onClick={deleteSalesData.bind(this,item["_id"])}
                                                                                    className="btn btn-outline-light text-success p-2 mb-0 btn-sm ms-2">
                                                                                <AiFillDelete size={15}/>
                                                                            </button>
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-12 mt-5">
                                            <nav aria-label="Page navigation example">
                                                <ReactPaginate
                                                    previousLabel="<"
                                                    nextLabel=">"
                                                    pageClassName="page-item"
                                                    pageLinkClassName="page-link"
                                                    previousClassName="page-item"
                                                    previousLinkClassName="page-link"
                                                    nextClassName="page-item"
                                                    nextLinkClassName="page-link"
                                                    breakLabel="..."
                                                    breakClassName="page-item"
                                                    breakLinkClassName="page-link"
                                                    pageCount={totalReturnData / perPage}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={5}
                                                    onPageChange={handlePageClick}
                                                    containerClassName="pagination"
                                                    activeClassName="active"
                                                />
                                            </nav>
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

export default ProductReturnList;