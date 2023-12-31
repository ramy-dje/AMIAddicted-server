const generalChat = require("../models/GeneralChat");


const addGeneraleChat = async (req,res)=>{
    const {id_Exéditeur,contennues} = req.body;
    if (!(id_Exéditeur && contennues)){
        res.json({input: "notComplete"});
    }else{
        try{
            const create =await new generalChat(req.body);
            create.save();
            res.json({"succes":true});
        }catch{
            res.json({"succes":false});
        }
    }
}
const getAllGeneralChat = async (req,res)=>{
    try{

        const result= await generalChat.find()./*populate('id_Exéditeur').*/sort({date_envoi : 1});

        res.json(result);
    }catch{
        res.json({"succes":false});
    }
}
const deleteOneGeneralChat = async (req,res)=>{
    const idMsg=req.params.idMsg;
    const idUser=req.params.idUser;
    if(!(idMsg && idUser)){
            res.json({input: "notComplete"});
    }else{
        try{
            await generalChat.deleteOne({_id:idMsg,id_Exéditeur:idUser});
            res.json({"succes":true});
        }catch{
            res.json({"succes":false});
        }
    }
}
// you can use it for any personne
const deleteAllGeneralChatOfOneUser = async (req,res)=>{
    const idUser=req.params.idUser;
    if(!(idUser)){
            res.json({input: "notComplete"});
    }else{
        try{
            await generalChat.deleteMany({id_Exéditeur:idUser});
            res.json({"succes":true});
        }catch{
            res.json({"succes":false});
        }
    }
}
// this is use just by admin
const deleteAllGeneralChat = async (req,res)=>{
    try{
        await generalChat.deleteMany();
        res.json({"succes":true});
    }catch{
        res.json({"succes":false});
    }
}
module.exports={
    addGeneraleChat,
    getAllGeneralChat,
    deleteOneGeneralChat,
    deleteAllGeneralChatOfOneUser,
    deleteAllGeneralChat
}