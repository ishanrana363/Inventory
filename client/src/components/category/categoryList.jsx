import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import ReactPaginate from "react-paginate";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import {Toaster} from "react-hot-toast";
import moment from "moment/moment.js";
import categoryStore from "../../apiRequest/categoryApi/categoryStoreApi.js";
import {deleteAlert} from "../../helpers/DeleteAlert.js";
import {errorToast, successToast} from "../../helpers/FormHelper.js";

const CategoryList = () => {
    const [loder, setLoder] = useState("d-none");
    const [perPage, setPerPage] = useState(5);
    const [searchValue, setSearchValue] = useState(0);
    const {categoryList,totalCategory,setCategoryList} = categoryStore();
    useEffect(() => {
        (async ()=>{
            setLoder("");
            await setCategoryList(1,perPage,0);
            setLoder("d-none");
        })()
    }, []);
    const handlePageChange = async (even) => {
        let pageNo = even.selected;
        setLoder("");
        await setCategoryList(pageNo+1,perPage,searchValue);
        setLoder("d-none");
    };
    const getPerPageData = async (even) => {
        setPerPage(parseInt(even.target.value));
        setLoder("");
        await setCategoryList(1,even.target.value,0);
        setLoder("d-none");
    };
    const getInputSearchValue = async (even) => {
        setSearchValue(even.target.value);
        if ((even.target.value).length===0){
            setSearchValue(0);
            setLoder("");
            await setCategoryList(1,perPage,0);
            setLoder("d-none");
        }
    };
    const submitSearchValue = async () => {
        setLoder("");
        await setCategoryList(1,perPage,searchValue);
        setLoder("d-none");
    };
    const deleteCategoryData = async (id) => {
        let deleteResp = await deleteAlert(id);
        if (deleteResp.isConfirmed){
            let resp = await deleteCategoryData(id);
            if (resp){
                successToast("Category delete successfully");
                setLoder("");
                await setCategoryList(1,perPage,0);
                setLoder("d-none");
            }else {
                errorToast("Category delete fail");
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
                                            <h5>Category List</h5>
                                        </div>

                                        <div className="col-2">
                                            <input  placeholder="Text Filter" className="form-control form-control-sm"/>
                                        </div>

                                        <div className="col-2">
                                            <select onChange={getPerPageData}  className="form-control mx-2 form-select-sm form-select form-control-sm" >
                                                <option value="5">5 Per Page</option>
                                                <option value="30">30 Per Page</option>
                                                <option value="50">50 Per Page</option>
                                                <option value="100">100 Per Page</option>
                                                <option value="100">200 Per Page</option>
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <div className="input-group mb-3">
                                                <input onChange={getInputSearchValue} type="text" className="form-control form-control-sm" placeholder="Search.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
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
                                                        categoryList.map((item,i)=>{
                                                            return (
                                                                <tr key={i} >
                                                                    <td>
                                                                        <p className="text-xs text-start mt-2 "> {i + 1} </p>
                                                                    </td>
                                                                    <td><p
                                                                        className="text-xs text-start mt-2 "> {item["name"]} </p>
                                                                    </td>
                                                                    <td><p
                                                                        className="text-xs text-start mt-2 "> {moment(item["createdAt"]).format("MMMM Do YYYY")} </p>
                                                                    </td>

                                                                    <td>
                                                                        <Link to={`/category/update/${item["_id"]}`} title={"Update"}
                                                                              className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
                                                                            <AiOutlineEdit size={15}/>
                                                                        </Link>
                                                                        <Link to="" title={"Delete"}>
                                                                            <button onClick={deleteCategoryData.bind(this,item["_id"])}
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
                                                    pageCount={totalCategory/perPage}
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

export default CategoryList;









