import React from 'react';
import Layout from "../../components/layout/layout.jsx";
import ProductCreate from "../../components/product/productCreate.jsx";

const ProductCreatePage = () => {
    return (
        <div>
            <Layout>
                <ProductCreate/>
            </Layout>
        </div>
    );
};

export default ProductCreatePage;