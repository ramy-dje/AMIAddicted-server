const express = require("express");
const router = express.Router();
const newQst = require("../models/NewQuestions");
const userConttroller=require("../controllers/userController");
const qstController=require("../controllers/questionController");
const Users = require("../models/Utilisateur");

router.route('/getDoctors').get(userConttroller.getDoctors);
router.route('/getAdmins').get(userConttroller.getAdmins);
router.route('/getPatients').get(userConttroller.getPatients);
router.route('/addPatientContact').put(userConttroller.addPatientContact);
router.route('/deletePatientContact').put(userConttroller.deletePatientContact);
router.route('/addDoctorContact').put(userConttroller.addDoctorContact);
router.route('/deleteDoctorContact').put(userConttroller.deleteDoctorContact);
router.route('/changeDoctorContact').put(userConttroller.changeDoctorContact);
router.route('/updateUser/:id').put(userConttroller.updateUser);
// ######################### ALL ABOUT NEW QUESTION 
router.route('/getNewQst').get(qstController.getNewQst);
router.route('/deleteNewQst').post(qstController.deleteNewQst);
router.route('/createNewQst').post(qstController.createNewQst);
//###################### THIS WHAT LEFT FOR NOW
router.route('/updateNewQst').post(async (req,res)=>{
    const {listName ,list,newListName}=req.body;
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
                    await newQst.updateOne({},{$push :{surveysList:{listName:newListName,list:list}}});
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
router.route('/getAnalytics').get(async(req,res)=>{
    const last12Months = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate()+1);
    for(let i = 11;i>=0;i--){
        const endDate = new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate()-i*28);
        const startDate = new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate()-28);
        const monthYear = endDate.toLocaleString('default',{day:'numeric',month:'short',year:'numeric'});
        const count = await Users.countDocuments({
            createdAt : {
                $gte : startDate,
                $lt : endDate
            }
        });
        last12Months.push({month:monthYear,count});

    }
    res.json(last12Months);

})

router.route('/getUser/:id').get(async(req,res)=>{ 
    const {id} = req.params;
    const user = await Users.findById(id);
    res.json(user)
})



module.exports = router;