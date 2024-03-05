import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import ReactPaginate from "react-paginate";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import expenseTypeStore from "../../apiRequest/expenseTypesApi/expenseTypesStoreApi.js";
import moment from "moment/moment.js";
import {deleteAlert} from "../../helpers/DeleteAlert.js";
import {deleteExpenseTypesApi} from "../../apiRequest/expenseTypesApi/expenseTypesApi.js";
import {Toaster} from "react-hot-toast";

const ExpenseTypeList = () => {
    const {expenseTypeDataList,expenseTypeDataTotal,expenseTypeDataListApi} = expenseTypeStore();
    const [loder, setLoder] = useState('d-none');
    const [perPage, setPerPage] = useState(5);
    const [searchValue, setSearchValue] = useState(0);
    useEffect(() => {
        (async ()=>{
            setLoder("");
            await expenseTypeDataListApi(1,perPage,searchValue);
            setLoder("d-none");
        }) ()
    }, []);
    const handlePageClick = async (even) => {
        let pageNumber = even.selected;
        setLoder("");
        await expenseTypeDataListApi(pageNumber+1,perPage,searchValue);
        setLoder("d-none");
    };
    const perPageDataGet = async (even) => {
        setPerPage(parseInt(even.target.value));
        setLoder("");
        await expenseTypeDataListApi(1,even.target.value,searchValue);
        setLoder("d-none");
    };
    const getInputSearchhValue = async (even) => {
        setSearchValue(even.target.value);
        if ((even.target.value).length===0){
            setLoder("");
            await expenseTypeDataListApi(1,perPage,searchValue);
            setLoder("d-none");
        }
    };
    const submitSearchValue = async (even) => {
        setLoder("");
        await expenseTypeDataListApi(1,perPage,searchValue);
        setLoder("d-none");
    };
    const deleteExpenseTypes = async (id) => {
        let result = await deleteAlert(id);

        if (result.isConfirmed){
            setLoder("");
            let respApi = await deleteExpenseTypesApi(id);
            setLoder("d-none");
            if (respApi){
                setLoder("");
                await expenseTypeDataListApi(1,perPage,searchValue);
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
                                            <h5>Expense Type List</h5>
                                        </div>

                                        <div className="col-2">
                                            <input  placeholder="Text Filter" className="form-control form-control-sm"/>
                                        </div>

                                        <div className="col-2">
                                            <select onChange={perPageDataGet}
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
                                            <div  className="input-group mb-3">
                                                <input onChange={getInputSearchhValue} type="text" className="form-control form-control-sm" placeholder="Search.." aria-label="Recipient's username" aria-describedby="button-addon2"/>
                                                <button onClick={submitSearchValue}  className="btn  btn-success btn-sm mb-0" type="button">Search</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="table-responsive table-section">
                                                <table className="table">
                                                    <thead className="sticky-top bg-white">
                                                    <tr>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">#No</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Name</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Created</td>
                                                        <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Action</td>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        expenseTypeDataList.map((item,i)=>{
                                                            return (
                                                                <tr key={i} >
                                                                    <td><p className="text-xs text-start">{i+1}</p>
                                                                    </td>
                                                                    <td><p className="text-xs text-start">{item["name"]}</p></td>
                                                                    <td><p className="text-xs text-start">{moment(item["createdDate"]).format('MMMM Do YYYY')}</p></td>
                                                                    <td>
                                                                        <Link to = {`/expense/type/update/${item["_id"]}`}  title={"Update"}
                                                                              className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
                                                                            <AiOutlineEdit size={15}/>
                                                                        </Link>
                                                                        <Link to="" title={"Delete"} >
                                                                            <button onClick={deleteExpenseTypes.bind(this,item["_id"])}
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
                                                    pageCount={expenseTypeDataTotal/perPage}
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
            <FullScreenLoder visibility = { loder } />
            <Toaster position="top-center" reverseOrder={false}/>
        </>
    );
};

export default ExpenseTypeList;