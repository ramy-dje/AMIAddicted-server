const express= require("express");
const newQstResCont = require("../controllers/NewQstResController");
const router = express.Router();
// ########## CREATE
// you have send userId in body
router.post('/create/newQstRes',newQstResCont.createOrUpdateNewQstRes);

// ########## UPDATE
// you have send userId in body
router.post('/update/newQstRes',newQstResCont.createOrUpdateNewQstRes);

// ########## DELETE
// you have to send userId in params
router.delete('/delete/newQstRes/:userId',newQstResCont.deleteNewQstRes);

// ########## ADD COMMENT
// you have send userId in params
router.post('/add/comment/:userId',newQstResCont.addOrUpdateComment);

// ######### UPDATE COMMENT
router.post('/update/comment/:userId',newQstResCont.addOrUpdateComment);


// ############ GET NEW QST RES
router.get('/newQstRes/:userId',newQstResCont.getNewQstRes);
module.exports=router;