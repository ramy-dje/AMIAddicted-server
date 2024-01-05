const newQstResM=require("../models/NewQstRes");

// if you need to update newQstRes you have send userId in body not in params
const createOrUpdateNewQstRes= async (req,res)=>{
    const {
        surveyName,
        patient,
        patientAnswers,
        result,
    }=req.body;
    if(!(surveyName && patient && patientAnswers && result)){
        res.json({input: "notComplete"});
    }else{
        try{
            const result=await newQstResM.find({patient:patient});
            if(result.length==0){
                const create = await new newQstResM(req.body);
                create.save();
            }else{
                await newQstResM.updateOne({patient:patient},req.body);
            }
            res.json({succes:true});
        }catch{
            res.json({succes:false});
        }
    }
}
const getNewQstRes = async (req,res)=>{
    userId=req.params.userId;
    if(!(userId)){
        res.json({input: "notComplete"});
    }else{
        try{
            const result=await newQstResM.find({patient:userId});
            res.json(result);
        }catch{
            res.json({succes:false});
        }
    }
}
const deleteNewQstRes = async (req,res)=>{
    userId=req.params.userId;
    if(!(userId)){
        res.json({input: "notComplete"});
    }else{
        try{
            await newQstResM.deleteMany({patient: userId});
            res.json({succes:true});
        }catch{
            res.json({succes:false});
        }
    }
}
// you can add and update in the same time
const addOrUpdateComment = async (req,res)=>{
    userId=req.params.userId;
    if(!(userId && req.body.comment)){
        res.json({input: "notComplete"});
    }else{
        let obj ={
            patient:userId,
            comment:req.body.comment
        }
        try{
            const result = await newQstResM.find({patient:userId});
            if(result.length==0){
                const create = await new newQstResM(obj);
                create.save();
                res.json({succes:true});
            }else{
                await newQstResM.updateOne({patient:userId},req.body);
                res.json({succes:true});
            }
        }catch{
            res.json({succes:false});
        }
    }
}
module.exports={
    createOrUpdateNewQstRes,
    getNewQstRes,
    deleteNewQstRes,
    addOrUpdateComment
}