import React from 'react';
import Layout from "../../components/layout/layout.jsx";
import PurchaseList from "../../components/purchase/purchaseList.jsx";

const PurchaseListPage = () => {
    return (
        <div>
            <Layout>
                <PurchaseList/>
            </Layout>
        </div>
    );
};

export default PurchaseListPage;