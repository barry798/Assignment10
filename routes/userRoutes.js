const express = require("express");
const { createUser, loginUser, getAllUsers } = require("../controllers/userController");
const router = express.Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/all", getAllUsers);

module.exports = router;