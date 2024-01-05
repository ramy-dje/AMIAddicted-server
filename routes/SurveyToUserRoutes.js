const SurveyToUserCont= require("../controllers/SurveyToUserController");
const express = require('express');
const router = express.Router();
// ########### CREATE
router.post('/create/SurveyToUser',SurveyToUserCont.crateSurveyToUser);

// ########## GET 
// you have to user id in params
router.get('/get/SurveyToUser/:userId',SurveyToUserCont.getSurveyToUser);

// ######### DELETE
// you have to send the id of Survey in params
router.delete('/delete/SurveyToUser/:id',SurveyToUserCont.deleteSurveyToUser);

module.exports=router;