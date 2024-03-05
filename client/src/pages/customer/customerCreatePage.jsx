import React from 'react';
import CustomerCreate from "../../components/customer/customerCreate.jsx";
import Layout from "../../components/layout/layout.jsx";

const CustomerCreatePage = () => {
    return (
        <div>
                <Layout>
                    <CustomerCreate/>
                </Layout>
        </div>
    );
};

export default CustomerCreatePage;