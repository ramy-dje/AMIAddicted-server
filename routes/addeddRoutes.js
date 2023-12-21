const express = require("express");
const router = express.Router();
const userConttroller=require("../controllers/userController");
const qstController=require("../controllers/questionController")
router.route('/getDoctors').get(userConttroller.getDoctors);
router.route('/getAdmins').get(userConttroller.getAdmins);
router.route('/getPatients').get(userConttroller.getPatients);
router.route('/addPatientContact').put(userConttroller.addPatientContact);
router.route('/deletePatientContact').put(userConttroller.deletePatientContact);
router.route('/addDoctorContact').put(userConttroller.addDoctorContact);
router.route('/changeDoctorContact').put(userConttroller.changeDoctorContact);
router.route('/updateUser/:id').put(userConttroller.updateUser);
// ######################### ALL ABOUT NEW QUESTION 
router.route('/getNewQst').get(qstController.getNewQst);
router.route('/updateNewQst').post(qstController.deleteNewQst);
router.route('/createNewQst').post(qstController.createNewQst);

module.exports = router;