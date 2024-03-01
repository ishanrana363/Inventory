const express = require("express");
const router = express.Router();

const userController = require("../controllers/users/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const brandsController = require("../controllers/brands/brandsController");
const categoryController = require("../controllers/categories/categoryController");
const customersController = require("../controllers/coustomers/coustomersController");
const suppliersController = require("../controllers/suppliers/suppliersController");
const expenseTypeController = require("../controllers/expenses/expensTypeController");
const expenseController = require("../controllers/expenses/expensController");
const productsListController = require("../controllers/products/productsController");
const purchaseController = require("../controllers/purchase/purchaseController");
const salesController = require("../controllers/sales/salesController");
const returnController = require("../controllers/return/returnController");
const reportController = require("../controllers/report/reportController");
const summeryController = require("../controllers/summery/dashboardSummeryController")



router.post("/create",userController.userCreateController);
router.post("/login",userController.userLoginController);
router.get("/profile/details",authMiddleware,userController.userProfileController);
router.put("/update/profile",authMiddleware,userController.userUpdateController);


// password reset


router.get("/send/email/:email",userController.sendEmailController);
router.get("/otp/verify/:email/:otpCode",userController.otpVerifyController);
router.post("/password/reset",userController.passwordResetController);


// brand


router.post("/brand/create", authMiddleware,brandsController.brandCreateController);
router.put("/brand/update/:id", authMiddleware,brandsController.brandUpdateController);
router.get("/brand/dropdown", authMiddleware,brandsController.brandDropDownController);
router.get("/brandList/:pageNo/:perPage/:searchKeyword", authMiddleware,brandsController.brandListController);
router.get("/brand/details/:id", authMiddleware,brandsController.brandDetailsIdController);
router.delete("/brand/delete/:id", authMiddleware,brandsController.brandDeleteController);



// category


router.post("/category/create",authMiddleware,categoryController.createCategoryController);
router.put("/category/update/:id",authMiddleware,categoryController.updateCategoryController);
router.get("/category/dropdown",authMiddleware,categoryController.dropDownCategoryController);
router.get("/category/:pageNo/:perPage/:searchKeyword", authMiddleware,categoryController.categoryListController);
router.get("/category/details/:id", authMiddleware,categoryController.categoryByIdDetailsController);
router.delete("/category/delete/:id", authMiddleware,categoryController.categoryDeleteController);


// customer


router.post("/customer/create",authMiddleware,customersController.createCustomerController);
router.put("/customer/update/:id",authMiddleware,customersController.updateCustomerController);
router.get("/customer/dropdown",authMiddleware,customersController.dropdownCustomerController);
router.get("/customer/:pageNo/:perPage/:searchKeyword", authMiddleware,customersController.listCustomerController);
router.get("/customer/details/:id", authMiddleware,customersController.detailsByIdCustomerController);
router.delete("/customer/delete/:id", authMiddleware,customersController.deleteCustomerController);


// supplier


router.post("/supplier/create",authMiddleware,suppliersController.createSupplierController);
router.put("/supplier/update/:id",authMiddleware,suppliersController.updateSupplierController);
router.get("/supplier/dropdown",authMiddleware,suppliersController.dropdownSupplierController);
router.get("/supplier/:pageNo/:perPage/:searchKeyword", authMiddleware,suppliersController.listSupplierController);
router.get("/supplier/details/:id", authMiddleware,suppliersController.detailsByIdSupplierController);
router.delete("/supplier/delete/:id", authMiddleware,suppliersController.deleteSupplierController);


// expense-types


router.post("/expense-types/create",authMiddleware,expenseTypeController.createExpenseTypeController);
router.put("/expense-types/update/:id",authMiddleware,expenseTypeController.updateExpenseTypeController);
router.get("/expense-types/dropdown",authMiddleware,expenseTypeController.dropdownExpenseTypeController);
router.get("/expense-types-list/:pageNo/:perPage/:searchKeyword", authMiddleware,expenseTypeController.listExpenseTypeController);
router.get("/expense-types/details/:id", authMiddleware,expenseTypeController.detailsByIdExpenseTypeController);
router.delete("/expense/delete/:id", authMiddleware,expenseTypeController.deleteExpenseTypeController);


// expense

router.post("/expense/create",authMiddleware,expenseController.createExpenseController);
router.put("/expense/update/:id",authMiddleware,expenseController.updateExpenseController);
router.get("/expense-list/:pageNo/:perPage/:searchKeyword", authMiddleware,expenseController.listExpenseController);
router.get("/expense/details/:id", authMiddleware, expenseController.detailsByIdExpenseController);
router.delete("/expense/delete/:id", authMiddleware, expenseController.deleteExpenseController);



// product list


router.post("/product/create",authMiddleware, productsListController.productCreateController);
router.put("/product/update/:id",authMiddleware, productsListController.productUpdateController);
router.get("/product-list/:pageNo/:perPage/:searchKeyword",authMiddleware, productsListController.productListController);
router.delete("/product/delete/:id",authMiddleware, productsListController.productDeleteController);
router.get("/product/details/:id",authMiddleware, productsListController.productDetailsById);


//purchase


router.post("/purchase/create",authMiddleware, purchaseController.createPurchaseController);
router.get("/purchase-list/:pageNo/:perPage/:searchKeyword",authMiddleware, purchaseController.purchaseListController);
router.delete("/purchase/delete/:id", authMiddleware, purchaseController.deletePurchaseController);


// sales


router.post("/sales/create",authMiddleware, salesController.salesCreateController);
router.get("/sales-list/:pageNo/:perPage/:searchKeyword",authMiddleware, salesController.salesListController);
router.delete("/sales/delete/:id",authMiddleware, salesController.salesDeleteController);



// return


router.post("/return/create",authMiddleware, returnController.returnCreateController);
router.get("/return-list/:pageNo/:perPage/:searchKeyword",authMiddleware, returnController.returnListController);
router.delete("/return/delete/:id",authMiddleware,returnController.deleteReturnController);


//report


router.get("/expense/report",authMiddleware, reportController.expenseReportController);
router.get("/purchase/report",authMiddleware, reportController.purchaseReportController);
router.get("/return/report",authMiddleware, reportController.returnReportController);
router.get("/sales/report",authMiddleware, reportController.salesReportController);


// summery


router.get("/expense/summery",authMiddleware,  summeryController.expenseSummeryController);
router.get("/purchase/summery",authMiddleware, summeryController.purchaseSummeryController);
router.get("/return/summery",authMiddleware, summeryController.returnSummeryController);
router.get("/sales/summery",authMiddleware, summeryController.sellSummeryController);








module.exports = router;