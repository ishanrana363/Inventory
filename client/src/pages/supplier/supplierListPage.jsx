import React from 'react';
import Layout from "../../components/layout/layout.jsx";
import SupplierList from "../../components/supplier/supplierList.jsx";

const SupplierListPage = () => {
    return (
        <div>
            <Layout>
                <SupplierList/>
            </Layout>
        </div>
    );
};

export default SupplierListPage;