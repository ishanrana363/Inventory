import React from 'react';
import Layout from "../../components/layout/layout.jsx";
import ExpenseReport from "../../components/report/expenseReport.jsx";

const ExpenseReportPage = () => {
    return (
        <div>
            <Layout>
                <ExpenseReport/>
            </Layout>
        </div>
    );
};

export default ExpenseReportPage;