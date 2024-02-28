const express = require("express");

const router = express.Router();

const {
  findUnacceptedUserControlle,
  acceptUserControlle,
} = require("../controllers/acceptUsreController");

router.get("/unacceptedUsers",findUnacceptedUserControlle);
router.put("/acceptUser/:idUser",acceptUserControlle);

module.exports = router;
