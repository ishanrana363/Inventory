import React from 'react';
import Layout from "../../components/layout/layout.jsx";
import BrandList from "../../components/brand/brandList.jsx";

const BrandListPage = () => {
    return (
        <div>
            <Layout>
                <BrandList/>
            </Layout>
        </div>
    );
};

export default BrandListPage;