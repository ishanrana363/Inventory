import React from 'react';
import Layout from "../../components/layout/layout.jsx";
import ExpenseTypeList from "../../components/expenseTypes/expenseTypeList.jsx";

const ExpenseTypeListPage = () => {
    return (
        <div>
            <Layout>
                <ExpenseTypeList/>
            </Layout>
        </div>
    );
};

export default ExpenseTypeListPage;