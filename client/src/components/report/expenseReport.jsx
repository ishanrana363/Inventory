import React, {useState} from 'react';
import reportStore from "../../apiRequest/reportApi/reportApiRequest.js";
import {errorToast, isEmpty} from "../../helpers/FormHelper.js";
import {Toaster} from "react-hot-toast";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import moment from "moment/moment.js";
import exportFromJSON from "export-from-json";
import CurrencyFormat from "react-currency-format";

const ExpenseReport = () => {
    const {reportData,setReportData} = reportStore();

    const [loder, setLoder] = useState("d-none");
    const [data, setData] = useState({
        fromDate : "",
        toDate : ""
    });
    const {fromDate,toDate} = data;

    const getDateInputValue = (name,value) => {
        setData((prevState)=>({
            ...prevState,
            [name] : value
        }))
    };

    const submitValue = async () => {
        if (isEmpty(fromDate)){
            errorToast("From date required");
        }else if (isEmpty(toDate)){
            errorToast("To date required");
        }else {
            setLoder("");
            await setReportData(fromDate,toDate);
            setLoder("d-none");
        }
    };
    const onExport = (exportType,data) => {
        const fileName = 'ExpensReeport'
        if(data.length>0){
            let ReportData=[]
            data.map((item)=>{
                let listItem={
                    "amount":item['amount'],
                    "note":item['note'],
                    "name":item['Type'][0]['name'],
                    "Date":moment(item['createdDate']).format('MMMM Do YYYY')
                }
                ReportData.push(listItem)
            })
            exportFromJSON({data: ReportData, fileName: fileName, exportType: exportType })
        }
    }
    return (
        <>
            <div className="container-fluid mt-5 " >
                <div className="row" >
                     <div className="col-12" >
                         <div className="card" >
                             <div className="card-body">
                                 <div className="row d-flex ">
                                     <h5 className="text-center">Expense Report by Date</h5>
                                     <hr className="bg-light"/>
                                     <div className="col-md-4">
                                         <label className="form-label"> Form Date:</label>
                                         <input type="date" value={fromDate} onChange={(e)=>{ getDateInputValue("fromDate",e.target.value) }}
                                                className="form-control form-control-sm animated fadeInLeft "/>
                                     </div>
                                     <div className="col-md-4">
                                         <label className="form-label">To Date:</label>
                                         <input type="date" value={toDate} onChange={(e)=>{ getDateInputValue("toDate",e.target.value) }}
                                                className="form-control form-control-sm animated fadeInRight "/>
                                     </div>
                                     <div className="row ">
                                         <div className="col-md-4 mt-4"  >
                                             <button onClick={submitValue} className="btn btn-success">
                                                 Create
                                             </button>
                                         </div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>
                    {
                        reportData.length>0?(
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <h6>Total: {reportData[0]['total'].length>0?<CurrencyFormat value={reportData[0]['total'][0]['totalAmount']} displayType={'text'} thousandSeparator={true} prefix={'$ '} />:0} </h6>
                                                <button onClick={onExport.bind(this,'csv',reportData[0]['Rows'])}  className="btn btn-sm my-2 btn-success">Download CSV</button>
                                                <button onClick={onExport.bind(this,'xls',reportData[0]['Rows'])}   className="btn btn-sm my-2 ms-2 btn-success">Download XLS</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ):(
                            <div></div>
                        )
                    }
                </div>
            </div>
            <FullScreenLoder visibility = {loder} />
            <Toaster position="top-center"/>
        </>
    );
};

export default ExpenseReport;