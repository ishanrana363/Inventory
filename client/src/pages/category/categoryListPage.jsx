import React from 'react';
import Layout from "../../components/layout/layout.jsx";
import CategoryList from "../../components/category/categoryList.jsx";

const CategoryListPage = () => {
    return (
        <div>
            <Layout>
                <CategoryList/>
            </Layout>
        </div>
    );
};

export default CategoryListPage;