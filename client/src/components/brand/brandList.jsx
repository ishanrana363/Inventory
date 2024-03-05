import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import ReactPaginate from "react-paginate";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import brandStore from "../../apiRequest/brandApi/brandStroreApiRequest.js";
import moment from "moment/moment.js";
import {deleteAlert} from "../../helpers/DeleteAlert.js";
import {deleteBrandApi} from "../../apiRequest/brandApi/brandApi.js";
import {errorToast, successToast} from "../../helpers/FormHelper.js";
import {Toaster} from "react-hot-toast";

const BrandList = () => {
    const {brandListData,totalBrandData,setBrandListData} = brandStore();
    const [loder, setLoder] = useState("d-none");
    const [searchValue, setSearchValue] = useState(0);
    const [perPage, setPerPage] = useState(5);
    useEffect(() => {
        (async ()=>{
            setLoder("");
            await setBrandListData(1,perPage,0);
            setLoder("d-none");
        })()
    }, []);
    const handlePageChange = async (even) => {
        let pageNumber = even.selected;
        setLoder("");
        await setBrandListData(pageNumber+1,perPage,0);
        setLoder("d-none");
    };
    const getPerPageValue = async (even) => {
        setPerPage(parseInt(even.target.value));
        setLoder("");
        await setBrandListData(1,even.target.value,0);
        setLoder("d-none");
    };
    const getSearchValue = async (even) => {
        setSearchValue(even.target.value);
        if ((even.target.value).length===0){
            setSearchValue(0);
            setLoder("");
            await setBrandListData(1,perPage,0);
            setLoder("d-none");
        }
    };
    const submitSearchValue = async () => {
        setLoder("");
        await setBrandListData(1,perPage,searchValue);
        setLoder("d-none");
    };
    const deleteBrandData = async (id) => {
        let deleteResp = await deleteAlert(id);
        if (deleteResp.isConfirmed){
            setLoder("");
            let resp = await deleteBrandApi(id);
            if (resp){
                successToast("Brand delete successfully");
                setLoder("");
                await setBrandListData(1,perPage,0);
                setLoder("d-none");
            }else {
                errorToast("Brand delete fail");
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
                                            <h5>Customer List</h5>
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
                                                <input onChange={getSearchValue} type="text" className="form-control form-control-sm" placeholder="Search.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                                <button onClick={submitSearchValue}  className="btn  btn-success btn-sm mb-0" type="button">Search</button>
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
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">CratedDate</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</td>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        brandListData.map((item,i)=>{
                                                            return (
                                                                <tr key={i} >
                                                                    <td>
                                                                        <p className="text-xs text-start mt-2 "> {i+1} </p>
                                                                    </td>
                                                                    <td><p
                                                                        className="text-xs text-start mt-2 "> {item["name"]} </p>
                                                                    </td>
                                                                    <td><p
                                                                        className="text-xs text-start mt-2 "> {moment(item["createdAt"]).format("MMMM Do YYYY")} </p>
                                                                    </td>


                                                                    <td>
                                                                        <Link to= {`/brand/update/${item["_id"]}` } title={"Update"}
                                                                              className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
                                                                            <AiOutlineEdit size={15}/>
                                                                        </Link>
                                                                        <Link to="" title={"Delete"}>
                                                                            <button onClick={deleteBrandData.bind(this,item["_id"])}
                                                                                className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">
                                                                                <AiOutlineDelete size={15}/>
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
                                                    pageCount={totalBrandData / perPage}
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
            <FullScreenLoder visibility = {loder} />
            <Toaster position="top-center"/>
        </>
    );
};

export default BrandList;