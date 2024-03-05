import React, {useEffect, useState} from 'react';
import ReactPaginate from "react-paginate";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import {Link} from "react-router-dom";
import customerStore from "../../apiRequest/customerApi/customerApiStore.js";
import {deleteAlert} from "../../helpers/DeleteAlert.js";
import {deleteCustomerApi} from "../../apiRequest/customerApi/customerApi.js";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";

const CustomerList = () => {
    const [loder, setLoder] = useState("d-none");
    const {customerData,totalCustomerData,setCustomerData} =  customerStore();
    const [search, setSearch] = useState(0);
    const [perPege, setPerPege] = useState(5)
    useEffect(() => {
        (async ()=>{
            setLoder("");
            await setCustomerData(1,5,0);
            setLoder("d-none");
        })()
    }, []);
    const handlePageChange = async (event) => {
        let pageNumber = event.selected;
        setLoder("");
        await setCustomerData(pageNumber+1,perPege,search);
        setLoder("d-none");
    };
    const perPageData =  async (event) => {
        setPerPege(parseInt( event.target.value));
        setLoder("")
        await setCustomerData(1,event.target.value,search);
        setLoder("d-none");

    };
    const searchData=async () => {
        setLoder("");
        await setCustomerData(1,perPege,search)
        setLoder("d-none");
    }

    const getSearchValue = async (even) => {
        setSearch(even.target.value);
        if ((even.target.value).length===0){
            setSearch(0);
            setLoder("");
            await setCustomerData(1,perPege,0);
            setLoder("d-none");
        }
    };
    const deleteCustomer = (id) => {
        deleteAlert(id).then(async (res)=>{
            if (res){
                setLoder("");
                await deleteCustomerApi(id);
                await setCustomerData(1,perPege,search);
                setLoder("d-none");
            }else {
                return false;
            }
        }).catch((e)=>{
            return false;
        })
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
                                                <select onChange={perPageData}  className="form-control mx-2 form-select-sm form-select form-control-sm" >
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
                                                    <button onClick={searchData}  className="btn  btn-success btn-sm mb-0" type="button">Search</button>
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
                                                        <tbody>
                                                        {
                                                            customerData.map((item,i)=>{
                                                                return (
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
                                                                            <Link to= {`/update/customer/${item["_id"]}`} title={"Edit"}
                                                                                  className="btn text-info btn-outline-light p-2 mb-0 btn-sm">
                                                                                <AiOutlineEdit size={15}/>
                                                                            </Link>
                                                                            <button onClick={deleteCustomer.bind(this,item["_id"])}
                                                                                className="btn btn-outline-light text-danger p-2 mb-0 btn-sm ms-2">
                                                                                <AiOutlineDelete size={15}/>
                                                                            </button>
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
                                                        pageCount={totalCustomerData/perPege}
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
            </>
    );
};

export default CustomerList;