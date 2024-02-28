const contactR=require('../controllers/contact');
const express = require("express");
const router = express.Router();


router.post("/addContact/:userId",contactR.addContactsController);
module.exports=router;