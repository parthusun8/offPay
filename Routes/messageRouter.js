const express = require("express");
const messageController = require("../controllers/messageController");

const router = express.Router();

// /api/users/........
router.post("/message", messageController.msgReply);
// router.post("/login", messageController.user_login);
// router.get("/logout", messageController.logout);
// router.get("/monitorAuth", messageController.monitor_AuthState);
// router.get("/getAllUsers", messageController.getAllUsers);
module.exports = router;
