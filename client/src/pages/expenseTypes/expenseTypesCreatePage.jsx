import React from 'react';
import Layout from "../../components/layout/layout.jsx";
import ExpenseTypesCreate from "../../components/expenseTypes/expenseTypesCreate.jsx";

const ExpenseTypesCreatePage = () => {
    return (
        <div>
            <Layout>
                <ExpenseTypesCreate/>
            </Layout>
        </div>
    );
};

export default ExpenseTypesCreatePage;