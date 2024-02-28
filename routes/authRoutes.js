const express = require("express");
const router = express.Router();

const {
  deleteUser,
  login,
  logout,
  newAuth
} = require("../controllers/authController");

router.delete("/user",deleteUser);
router.post("/login",login);
router.post("/logout",logout);
router.post("/newRegister",newAuth);

module.exports = router;
