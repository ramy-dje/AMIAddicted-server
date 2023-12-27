const express = require("express");
const router = express.Router();
const newQst = require("../models/NewQuestions");
const userConttroller=require("../controllers/userController");
const qstController=require("../controllers/questionController");
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
router.route('/deleteNewQst').post(qstController.deleteNewQst);
router.route('/createNewQst').post(qstController.createNewQst);
//###################### THIS WHAT LEFT FOR NOW
router.route('/updateNewQst').post(async (req,res)=>{
    const {listName ,list}=req.body;
    if(!(listName && list)){
        res.json({input: "notComplete"});
    }else{
        try{
            let check=false;
            const result= await newQst.findOne();
            for(let i = 0;i<=result.surveysList.length-1;i++){
                if(result.surveysList[i].listName==listName){
                    // firstly it delete the old one
                    await newQst.updateOne({},{$pull :{surveysList:{listName:listName}}});
                    // secondly it push the new one
                    await newQst.updateOne({},{$push :{surveysList:{listName:listName,list:list}}});
                    check=true;
                    i=result.surveysList.length;
                    res.json({succes:true});
                }
            }
            if(check==false){
                res.json({false:'listName dosn\'t exist'});
            }
        }catch{
            res.json({succes:false});
        }
    }
});
router.route('/getOneNewQst/:listName').get(async (req,res)=>{
    const {listName}=req.params;
    if(!(listName)){
        res.json({input: "notComplete"});
    }else{
        try{
            let check=false;
            const result= await newQst.findOne();
            for(let i = 0;i<=result.surveysList.length-1;i++){
                if(result.surveysList[i].listName==listName){
                    check=true;
                    res.json(result.surveysList[i]);
                    i=result.surveysList.length;
                }
            }
            if(check==false){
                res.json({false:'listName dosn\'t exist'});
            }
        }catch{
            res.json({succes:false});
        }
    }
});
module.exports = router;