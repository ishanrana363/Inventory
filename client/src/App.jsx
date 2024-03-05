import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateUserPage from "./pages/users/createUserPage.jsx";
import UserLoginPage from "./pages/users/userLoginPage.jsx";
import SendEmailUserPage from "./pages/passwordReset/sendEmailUserPage.jsx";
import UserOtpVerifyPage from "./pages/passwordReset/userOtpVerifyPage.jsx";
import NewPasswordSetPage from "./pages/passwordReset/newPasswordSetPage.jsx";
import CustomerCreatePage from "./pages/customer/customerCreatePage.jsx";
import {getToken} from "./helpers/SessionHelper.js";
import DashboardSummeryPage from "./pages/dashboardSummery/dashboardSummeryPage.jsx";
import SupplierCreatePage from "./pages/supplier/supplierCreatePage.jsx";
import CreateBrandPage from "./pages/brand/createBrandPage.jsx";
import CreateCategoryPage from "./pages/category/createCategoryPage.jsx";
import ExpenseTypesCreatePage from "./pages/expenseTypes/expenseTypesCreatePage.jsx";
import CustomerListPage from "./pages/customer/customerListPage.jsx";
import CustomerUpdatePage from "./pages/customer/customerUpdatePage.jsx";
import SupplierListPage from "./pages/supplier/supplierListPage.jsx";
import SupplierUpdatePage from "./pages/supplier/supplierUpdatePage.jsx";
import ExpenseTypeListPage from "./pages/expenseTypes/expenseTypeListPage.jsx";
import ExpenseTypesUpdatePage from "./pages/expenseTypes/expenseTypesUpdatePage.jsx";
import ExpenseCreate from "./components/expense/expenseCreate.jsx";
import ExpenseCreatePage from "./pages/expense/expenseCreatePage.jsx";
import ExpenseListPage from "./pages/expense/expenseListPage.jsx";
import ExpenseUpdatePage from "./pages/expense/expenseUpdatePage.jsx";
import BrandUpdatePage from "./pages/brand/brandUpdatePage.jsx";
import BrandListPage from "./pages/brand/brandListPage.jsx";
import CategoryList from "./components/category/categoryList.jsx";
import CategoryListPage from "./pages/category/categoryListPage.jsx";
import CategoryUpdate from "./components/category/categoryUpdate.jsx";
import UpdateCategoryListPage from "./pages/category/updateCategoryListPage.jsx";

const App = () => {
    if (getToken()){
        return(
                <BrowserRouter>
                    <Routes>

                        <Route path="/" element={ < DashboardSummeryPage /> } />

                        <Route path="/customer/create" element={<CustomerCreatePage/>} />
                        <Route path="/customer/list" element={<CustomerListPage/>} />
                        <Route path="/update/customer/:id" element={<CustomerUpdatePage/>} />

                        <Route path="/supplier/create" element={<SupplierCreatePage/>} />
                        <Route path="/supplier/list" element={<SupplierListPage/>} />
                        <Route path="/supplier/update/:id" element={<SupplierUpdatePage/>} />

                        <Route path="/expense/type/create" element={<ExpenseTypesCreatePage/>} />
                        <Route path="/expense/type/list" element={<ExpenseTypeListPage/>} />
                        <Route path="/expense/type/update/:id" element={<ExpenseTypesUpdatePage/>} />

                        <Route path="/expense/create" element={<ExpenseCreatePage/>} />
                        <Route path="/expense/list" element={<ExpenseListPage/>} />
                        <Route path="/expense/update/:id" element={<ExpenseUpdatePage/>} />

                        <Route path="/brand/create" element={<CreateBrandPage/>} />
                        <Route path="/brand/list" element={< BrandListPage />} />
                        <Route path="/brand/update/:id" element={< BrandUpdatePage />} />

                        <Route path="/category/create" element={<CreateCategoryPage/>} />
                        <Route path="/category/list" element={<CategoryListPage/>} />
                        <Route path="/category/update/:id" element={<UpdateCategoryListPage/>} />






                    </Routes>
                </BrowserRouter>
        )
    }else {
        return (
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<UserLoginPage/>} />
                        <Route path="/registration" element={<CreateUserPage/>} />
                        <Route path="/send/otp" element={ <SendEmailUserPage/> } />
                        <Route path="/verify/otp" element={ <UserOtpVerifyPage/> } />
                        <Route path="/set/password" element={ <NewPasswordSetPage/> } />

                    </Routes>
                </BrowserRouter>
        )
    }
};

export default App;