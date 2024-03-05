import React from 'react';
import Layout from "../../components/layout/layout.jsx";
import ExpenseCreate from "../../components/expense/expenseCreate.jsx";

const ExpenseCreatePage = () => {
    return (
        <div>
            <Layout>
                <ExpenseCreate/>
            </Layout>
        </div>
    );
};

export default ExpenseCreatePage;