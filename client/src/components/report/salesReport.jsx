import React, {useState} from 'react';
import {Toaster} from "react-hot-toast";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import {errorToast, isEmpty} from "../../helpers/FormHelper.js";
import reportStore from "../../apiRequest/reportApi/reportApiRequest.js";
import moment from "moment/moment.js";
import exportFromJSON from "export-from-json";
import CurrencyFormat from "react-currency-format";

const SalesReport = () => {
    const {salesReportData,setSalesReportData} = reportStore()
    const [loder, setLoder] = useState("d-none")
    const [data, setData] = useState({
        fromDate:"",
        toDate:""
    });
    const onExport = (exportType,data) => {
        const fileName = 'SalesReport'
        if(data.length>0){
            let ReportData=[]
            data.map((item)=>{
                let listItem={
                    "product":item['product']['name'], "unit":item['product']['unit'],
                    "details":item['product']['details'],
                    "brand":item['brand'][0]['name'],
                    "category":item['category'][0]['name'],
                    "uniCost":item['uniCost'],
                    "total":item['total'],
                    "Date":moment(item['createdDate']).format('MMMM Do YYYY')
                }
                ReportData.push(listItem)
            })
            exportFromJSON({data: ReportData, fileName: fileName, exportType: exportType })
        }
    }
    const {fromDate,toDate} = data;
    const getInputValue = (name,value) => {
        setData((prevState)=>({
            ...prevState,
            [name] : value
        }))
    };
    const submitInputValue = async () => {
        if (isEmpty(fromDate)){
            errorToast("From date required");
        }else if (isEmpty(toDate)){
            errorToast("To date required");
        }else {
            setLoder("");
            await setSalesReportData(fromDate,toDate);
            setLoder("d-none");
        }
    };
    return (
        <>
            <div className="container-fluid mt-4 " >
                <div className="row" >
                    <div className="col-12">
                        <div className="card-body">
                            <div className="row d-flex ">
                                <h5 className="text-center ">Sales Report by Date</h5>
                                <hr className="bg-light mt-2 "/>
                                <div className="col-md-4">
                                    <label className="form-label ms-5 "> Form Date:</label>
                                    <input type="date"
                                           value={fromDate} onChange={(e)=>{getInputValue("fromDate",e.target.value)}}
                                           className="form-control form-control-sm animated fadeInLeft ms-5 "/>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label ms-5 ">To Date:</label>
                                    <input type="date" value={toDate} onChange={(e)=>{getInputValue("toDate",e.target.value)}}
                                           className="form-control form-control-sm animated fadeInRight ms-5 "/>
                                </div>
                                <div className="row ">
                                    <div className="col-md-4 mt-4">
                                        <button onClick={submitInputValue} className="btn btn-success animated fadeInRight ms-5 ">
                                            Create
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        salesReportData.length>0?(
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <h6 className="animated fadeInLeft ms-3 " >Total: {salesReportData[0]['total'].length>0?<CurrencyFormat value={salesReportData[0]['total'][0]['totalAmount']} displayType={'text'} thousandSeparator={true} prefix={'$ '} />:0} </h6>
                                                <button  onClick={onExport.bind(this,'csv',salesReportData[0]['Rows'])}  className="btn btn-sm my-2 btn-success animated fadeInRight ms-3 ">Download CSV</button>
                                                <button onClick={onExport.bind(this,'xls',salesReportData[0]['Rows'])}   className="btn btn-sm my-2 ms-2 btn-success animated fadeInLeft ms-3 ">Download XLS</button>
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
            <Toaster position="top-center"/>
            <FullScreenLoder visibility = {loder} />
        </>
    );
};

export default SalesReport;