const express = require("express");
const router = express.Router();

const userController = require("../controllers/users/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const brandsController = require("../controllers/brands/brandsController");
const categoryController = require("../controllers/categories/categoryController");
const customersController = require("../controllers/coustomers/coustomersController");
const suppliersController = require("../controllers/suppliers/suppliersController");



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


// category


router.post("/category/create",authMiddleware,categoryController.createCategoryController);
router.put("/category/update/:id",authMiddleware,categoryController.updateCategoryController);
router.get("/category/dropdown",authMiddleware,categoryController.dropDownCategoryController);
router.get("/category/:pageNo/:perPage/:searchKeyword", authMiddleware,categoryController.categoryListController);
router.get("/category/details/:id", authMiddleware,categoryController.categoryByIdDetailsController);


// customer


router.post("/customer/create",authMiddleware,customersController.createCustomerController);
router.put("/customer/update/:id",authMiddleware,customersController.updateCustomerController);
router.get("/customer/dropdown",authMiddleware,customersController.dropdownCustomerController);
router.get("/customer/:pageNo/:perPage/:searchKeyword", authMiddleware,customersController.listCustomerController);
router.get("/customer/details/:id", authMiddleware,customersController.detailsByIdCustomerController);


// supplier


router.post("/supplier/create",authMiddleware,suppliersController.createSupplierController);
router.put("/supplier/update/:id",authMiddleware,suppliersController.updateSupplierController);
router.get("/supplier/dropdown",authMiddleware,suppliersController.dropdownSupplierController);
router.get("/supplier/:pageNo/:perPage/:searchKeyword", authMiddleware,suppliersController.listSupplierController);
router.get("/supplier/details/:id", authMiddleware,suppliersController.detailsByIdSupplierController);








module.exports = router;