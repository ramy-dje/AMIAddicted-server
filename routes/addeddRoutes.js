const express = require("express");
const router = express.Router();
const userConttroller=require("../controllers/userController");
const qstController=require("../controllers/questionController");
const userModel = require('../models/Utilisateur');


router.route('/getDoctors').get(userConttroller.getDoctors);
router.route('/getAdmins').get(userConttroller.getAdmins);
router.route('/getPatients').get(userConttroller.getPatients);
router.route('/addPatientContact').put(userConttroller.addPatientContact);
router.route('/deletePatientContact').put(userConttroller.deletePatientContact);
router.route('/deleteDoctorContact').put(userConttroller.deleteDoctorContact);
router.route('/addDoctorContact').put(userConttroller.addDoctorContact);
router.route('/changeDoctorContact').put(userConttroller.changeDoctorContact);
router.route('/updateUser/:id').put(userConttroller.updateUser);
// ######################### ALL ABOUT NEW QUESTION 
router.route('/getNewQst').get(qstController.getNewQst);
router.route('/deleteNewQst').post(qstController.deleteNewQst);
router.route('/createNewQst').post(qstController.createNewQst);


router.route('/getUser/:id').get(async(req,res)=>{
    const {id} = req.params;
    const data = await userModel.findById(id);
    res.json(data);
})

router.route('/newRegister').post(async(req,res)=>{
    const { Nom, Prenom, Gener, dt_Naiss, email, password, Autorisation ,avatar } = req.body
    const data = await userModel.create({ Nom, Prenom, Gener, dt_Naiss, email, password, role:Autorisation ,avatar } )
    res.json(data)
});

module.exports = router;