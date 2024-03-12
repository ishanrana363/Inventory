import React from 'react';
import ProductList from "../../components/product/productList.jsx";
import Layout from "../../components/layout/layout.jsx";

const ProductListPage = () => {
    return (
        <div>
           <Layout>
               <ProductList/>
           </Layout>
        </div>
    );
};

export default ProductListPage;