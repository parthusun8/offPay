const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// /api/users/........
// router.post("/signup", userController.user_register);
// router.post("/login", userController.user_login);
// router.get("/logout", userController.logout);
// router.post("/getuser", userController.getUserDetails);
// router.post("/transaction", userController.transaction);
module.exports = router;
