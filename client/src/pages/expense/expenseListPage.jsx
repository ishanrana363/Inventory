import React from 'react';
import Layout from "../../components/layout/layout.jsx";
import ExpenseList from "../../components/expense/expenseList.jsx";

const ExpenseListPage = () => {
    return (
        <div>
            <Layout>
                <ExpenseList/>
            </Layout>
        </div>
    );
};

export default ExpenseListPage;