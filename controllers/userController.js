const Doctor = require("../models/Medecin");
const Admin = require("../models/Admin");
const Patient = require("../models/Patient");
const Users = require("../models/Utilisateur");
const newQst = require('../models/NewQuestions');

const getDoctors =async (req,res)=>{
    try{
        const doc = await Users.find({role:'DOCTOR'});
        res.json(doc);
    }catch(err){
        res.json({succes:false});
    }
}

const getAdmins = async (req,res)=>{
    try{
        const adm = await Users.find({role:'ADMIN'});
        res.json(adm)
    }catch(e){
        res.json({succes:false});
    }
}

const getPatients = async (req,res)=>{
    try{
        const pat = await Users.find({role:'PATIENT'});
        res.json(pat)
    }catch{
        res.json({succes:false});
    }
}

const addPatientContact= async (req,res)=>{
   const {Doc,Patient} = req.body;
   if(!(Doc && Patient)){
        res.json({input: "notComplete"});
   }else{
    try{
       const doctor = await Users.findByIdAndUpdate(
        Doc._id,
        {
          $push: { 'contacts': Patient },
        },
        { new: true }
      );
        
        //await doctor.save();
        res.json({
            s:'done',
            doctor
        })
    }catch{
        res.json({succes:false});
    }

   }
}

const deletePatientContact= async (req,res)=>{
    try{
        const {Doc,Patient} = req.body;
        
        const doctor = await Users.updateOne(
         {_id : Doc._id},
         {
           $pull: { 'contacts': Patient },
         }
       );
         
         //await doctor.save();
         res.json({
             s:'done',
             doctor
         })
    }catch{
        res.json({succes:false});
    }
}

const addDoctorContact= async (req,res)=>{
    try{
        const {Doc,Patient} = req.body;
       
       const patient = await Users.findByIdAndUpdate(
        Patient._id,
        {
            $push: { 'contacts': Doc },
        },
        { new: true }
      );
        res.json({
            s:'done',
            patient
        })
    }catch{
        res.json({succes:false});
    }
}

const changeDoctorContact= async (req,res)=>{
    try{
        const {Doc,Patient} = req.body;
       console.log('deleted')
       const doctor = await Users.updateOne(
        {_id : Patient._id},
        {
          $set: { 'contacts': Doc },
        }
      );
        
        //await doctor.save();
        res.json({
            s:'done',
            doctor
        })
    }catch{
        res.json({succes:false});
    }
}

const updateUser = async (req,res)=>{
    try{
        const {id} = req.params;
        const data = req.body;
        const {Nom,Prenom,Gener,email,password,dt_Naiss} = data;
        console.log({Nom,Prenom,Gener,email,password,dt_Naiss})
        const user = await Users.updateOne({_id:id},{Nom,Prenom,Gener,email,password});
        res.json({
            isSuccess : true,
            user:{...data,_id:id}
        })
    }catch{
        res.json({succes:false});
    }
}
module.exports={
    getDoctors ,
    getPatients ,
    getAdmins ,
    addPatientContact,
    deletePatientContact,
    addDoctorContact ,
    changeDoctorContact ,
    updateUser
}