const SurveyToUserM = require('../models/SurveyToUser');

const crateSurveyToUser = async (req,res)=>{
const {userId,survey}=req.body;
if(!(userId && survey)){
    res.json({input: "notComplete"});
}else{
    try{
        const create = await new SurveyToUserM(req.body);
        create.save();
        res.json({succes: true});
    }catch{
        res.json({succes: false});
    }
}
}
const getSurveyToUser = async (req,res)=>{
    const userId = req.params.userId;
    try{
        const result = await SurveyToUserM.find({userId:userId});
        console.log(result)
        res.json(result);
       
        
    }catch{
        res.json({succes:false})
    }
}
const deleteSurveyToUser = async (req,res)=>{
    const id = req.params.id;
    try{
        await SurveyToUserM.deleteOne({_id:id});
        res.json({succes:true});
    }catch{
        res.json({succes:false});
    }
}
module.exports={
    crateSurveyToUser,
    getSurveyToUser,
    deleteSurveyToUser
}