import React from 'react';
import Layout from "../../components/layout/layout.jsx";
import ExpenseTypeUpdate from "../../components/expenseTypes/expenseTypeUpdate.jsx";

const ExpenseTypesUpdatePage = () => {
    return (
        <div>
            <Layout>
                <ExpenseTypeUpdate/>
            </Layout>
        </div>
    );
};

export default ExpenseTypesUpdatePage;