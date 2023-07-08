const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/register", userController.register);
router.post("/loginWithEmail", userController.login_using_email);
router.post("/loginWithPhone", userController.login_using_phone);
router.post("/deleteUser", userController.deleteUser);
router.post("/transaction", userController.transaction);
router.post("/addBalance", userController.addBalance);

// /api/users/........
// router.post("/signup", userController.user_register);
// router.post("/login", userController.user_login);
// router.get("/logout", userController.logout);
// router.post("/getuser", userController.getUserDetails);
// router.post("/transaction", userController.transaction);
module.exports = router;
