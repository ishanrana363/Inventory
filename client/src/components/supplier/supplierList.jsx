import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useParams} from "react-router-dom";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import ReactPaginate from "react-paginate";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import supplierStore from "../../apiRequest/supplierApi/supplierStoreApi.jsx";
import {deleteAlert} from "../../helpers/DeleteAlert.js";
import {supplierDeleteApi} from "../../apiRequest/supplierApi/supplierApiRequest.js";
import {Toaster} from "react-hot-toast";

const SupplierList = () => {
    const [loder, setLoder] = useState("d-none");
    const {customerDataList,customerDataListTotal,customerDataListApi} = supplierStore();
    const [perPage, setPerPage] = useState(5);
    const [searchValue, setSearchValue] = useState(0);
    const {id} = useParams();
    useEffect(() => {
        (async ()=>{
            setLoder("");
            await customerDataListApi(1,perPage,searchValue);
            setLoder("d-none");
        }) ()
    }, []);
    const handlePageChange = async (event) => {
        let page = event.selected;
        setLoder("");
        await customerDataListApi(page+1,perPage,searchValue);
        setLoder("d-none")
    };
    const getPerPageValue = async (even) => {
        setPerPage(parseInt(even.target.value));
        setLoder("");
        await customerDataListApi(1,even.target.value,searchValue);
        setLoder("d-none");
    };
    const getSearchValue = async (even) => {
        setSearchValue(even.target.value);
        if ((even.target.value).length===0){
            setSearchValue(0);
            setLoder("");
            await customerDataListApi(1,perPage,0);
            setLoder("d-none");
        }
    };
    const userSubmitValue = async () => {
        setLoder("");
        await customerDataListApi(1,perPage,searchValue);
        setLoder("d-none");
    };
    const deleteItem = async (id) => {
        let Result = await deleteAlert();
        if(Result.isConfirmed){
            setLoder("");
            let DeleteResult= await supplierDeleteApi(id);
            setLoder("d-none");
            if(DeleteResult){
                setLoder("");
                await customerDataListApi(1,perPage,searchValue);
                setLoder("d-none");
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
                                            <h5>Supplier List</h5>
                                        </div>

                                        <div className="col-2">
                                            <input  placeholder="Text Filter" className="form-control form-control-sm"/>
                                        </div>

                                        <div className="col-2">
                                            <select onChange={getPerPageValue}  className="form-control mx-2 form-select-sm form-select form-control-sm" >
                                                <option value="5">5 Per Page</option>
                                                <option value="30">30 Per Page</option>
                                                <option value="50">50 Per Page</option>
                                                <option value="100">100 Per Page</option>
                                                <option value="100">200 Per Page</option>
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <div className="input-group mb-3">
                                                <input onChange={getSearchValue}  type="text" className="form-control form-control-sm" placeholder="Search.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                                <button onClick={userSubmitValue} className="btn  btn-success btn-sm mb-0" type="button">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive table-section">
                                                <table className="table ">
                                                    <thead className="sticky-top bg-white">
                                                    <tr>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ">No</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Phone</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Email</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</td>
                                                    </tr>
                                                    </thead>
                                                    {
                                                        customerDataList.map((item,i)=>{
                                                            return (
                                                                <tbody>
                                                                <tr key={i} >
                                                                    <td>
                                                                        <p className="text-xs text-start mt-2 "> {i+1} </p>
                                                                    </td>
                                                                    <td><p
                                                                        className="text-xs text-start mt-2 "> { item["name"] } </p>
                                                                    </td>
                                                                    <td><p
                                                                        className="text-xs text-start mt-2 "> {item["phone"]} </p>
                                                                    </td>
                                                                    <td><p
                                                                        className="text-xs text-start mt-2 ">{item["email"]}</p>
                                                                    </td>

                                                                    <td>
                                                                        <Link to={`/supplier/update/${item["_id"]}`} title={"Update"}
                                                                              className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
                                                                            <AiOutlineEdit size={15}/>
                                                                        </Link>
                                                                        <Link to="" title={"Delete"} >
                                                                            <button onClick= { deleteItem.bind(this,item["_id"]) }
                                                                                className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">
                                                                                <AiOutlineDelete size={15}/>
                                                                            </button>
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                                </tbody>
                                                            )
                                                        })
                                                    }
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
                                                    pageCount={customerDataListTotal / perPage}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={5}
                                                    onPageChange={handlePageChange}
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

export default SupplierList;