import React, {useState} from 'react';
import reportStore from "../../apiRequest/reportApi/reportApiRequest.js";
import {errorToast, isEmpty} from "../../helpers/FormHelper.js";
import {Toaster} from "react-hot-toast";
import FullScreenLoder from "../layout/FullScreenLoder.jsx";
import exportFromJSON from "export-from-json";
import CurrencyFormat from "react-currency-format";

const PurchaseReport = () => {
    const {purchaseReportData,setPurchaseReportData} = reportStore();
    const [loder, setLoder] = useState("d-none");
    const [data, setData] = useState({
        fromDate : "",
        toDate : "",
    });
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
            await setPurchaseReportData(fromDate,toDate);
            setLoder("d-none");
        }
    };
    const onExport = (exportType,data) => {
        let fileName  = "PurchaseReport";
        let reportData = [];
        if (data.length>0){
            data.map((item)=>{
                let itemData = {
                    "ProductName" : item["product"]["name"],
                    "CategoryName" : item["category"]["0"]["name"],
                    "BrandName" : item["brand"]["0"]["name"],
                    "qty" : item["qty"],
                    "uniCost" : item["uniCost"],
                    "total" : item["total"],
                }
                reportData.push(itemData)
            })
        }
        exportFromJSON({data:reportData, fileName:fileName,exportType:exportType});
    };
    return (
        <>
          <div className={"container-fluid"} >
              <div className={"row"} >
                  <div className={"col-12"} >
                      <div className={"card"} >
                          <div className={"card-body"}>
                              <h5 className={"text-center animated fadeInLeft "} >Purchase report by date.</h5>
                              <hr className="bg-light"/>
                              <div className={"container"}>
                                  <div className={"row"}>
                                      <div className={"col-md-4"}>
                                          <label htmlFor={"fromDate"} className="form-label">Form Date :</label>
                                          <input value={fromDate} onChange={(e)=>{getInputValue("fromDate",e.target.value)}}
                                              type={"date"} className={"form-control animated fadeInLeft"}
                                                 id={"fromDate"}/>
                                      </div>
                                      <div className={"col-md-4"}>
                                          <label htmlFor={"toDate"} className="form-label">To Date:</label>
                                          <input value={toDate} onChange={(e)=>{getInputValue("toDate",e.target.value)}}
                                              type={"date"} className={"form-control animated fadeInRight"}
                                                 id={"toDate"}/>
                                      </div>
                                  </div>
                                  <div className={"col-md-4 mt-4 "}>
                                      <button onClick={submitInputValue} className={"btn btn-success animated fadeInRight "}>
                                          Create
                                      </button>
                                  </div>
                              </div>
                          </div>
                      </div>

                      {
                          purchaseReportData.length>0 ? (
                              <div className={"col-12"} >
                                  <div className={"card"} >
                                      <div className={"card-body"} >
                                          <div className={"row"} >
                                              <div className={"col"}>
                                                  <h6> Total : {purchaseReportData[0]["Total"].length > 0 ?
                                                      <CurrencyFormat
                                                          value={purchaseReportData[0]["Total"][0]["totalAmount"]}
                                                          displayType={'text'} thousandSeparator={true}
                                                          prefix={'$'}/> : 0} </h6>
                                                  <button
                                                      onClick={onExport.bind(this, "csv", purchaseReportData[0]["Rows"])}
                                                      className={"btn btn-sm my-2 btn-success animated fadeInLeft "}>Download csv
                                                  </button>
                                                  <button
                                                      onClick={onExport.bind(this, "xls", purchaseReportData[0]["Rows"])}
                                                      className={"btn btn-sm ms-5 my-2 btn-success animated fadeInRight "}>Download xls
                                                  </button>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>

                              ) :
                              (<div></div>)
                      }


                  </div>
              </div>
          </div>
            <FullScreenLoder visibility = {loder} />
            <Toaster position="top-center"/>
        </>
    );
};

export default PurchaseReport;