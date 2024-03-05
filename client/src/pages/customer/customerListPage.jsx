import React from 'react';
import Layout from "../../components/layout/layout.jsx";
import CustomerList from "../../components/customer/customerList.jsx";

const CustomerListPage = () => {
    return (
        <div>
            <Layout>
                <CustomerList/>
            </Layout>
        </div>
    );
};

export default CustomerListPage;