import React from 'react';
import Layout from "../../components/layout/layout.jsx";
import SaleList from "../../components/sales/saleList.jsx";

const SaleListPage = () => {
    return (
        <div>
            <Layout>
                <SaleList/>
            </Layout>
        </div>
    );
};

export default SaleListPage;