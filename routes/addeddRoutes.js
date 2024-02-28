const express = require("express");
const router = express.Router();
const newQst = require("../models/NewQuestions");
const userConttroller=require("../controllers/userController");
const qstController=require("../controllers/questionController");
const Users = require("../models/Utilisateur");

router.get('/getDoctors',userConttroller.getDoctors);
router.get('/getAdmins',userConttroller.getAdmins);
router.get('/getPatients',userConttroller.getPatients);
router.put('/addPatientContact',userConttroller.addPatientContact);
router.put('/deletePatientContact',userConttroller.deletePatientContact);
router.put('/addDoctorContact',userConttroller.addDoctorContact);
router.put('/deleteDoctorContact',userConttroller.deleteDoctorContact);
router.put('/changeDoctorContact',userConttroller.changeDoctorContact);
router.put('/updateUser/:id',userConttroller.updateUser);
router.delete('/deleteUser/:id',userConttroller.deleteUser);
// ######################### ALL ABOUT NEW QUESTION 
router.get('/getNewQst',qstController.getNewQst);
router.post('/deleteNewQst',qstController.deleteNewQst);
router.post('/createNewQst',qstController.createNewQst);
//###################### THIS WHAT LEFT FOR NOW
router.post('/updateNewQst',async (req,res)=>{
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
router.get('/getOneNewQst/:listName',async (req,res)=>{
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
router.get('/getAnalytics',async(req,res)=>{
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

router.get('/getUser/:id',async(req,res)=>{ 
    const {id} = req.params;
    const user = await Users.findById(id);
    res.json(user)
})



module.exports = router;