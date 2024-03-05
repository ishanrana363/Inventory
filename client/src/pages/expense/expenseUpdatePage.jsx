import React from 'react';
import Layout from "../../components/layout/layout.jsx";
import ExpenseUpdate from "../../components/expense/expenseUpdate.jsx";

const ExpenseUpdatePage = () => {
    return (
        <div>
            <Layout>
                <ExpenseUpdate/>
            </Layout>
        </div>
    );
};

export default ExpenseUpdatePage;