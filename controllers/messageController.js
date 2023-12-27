const msgFunc = require("../crud/crudAlertMessage");
const msgModel = require("../models/Message");
// put message
const createMsgController = async (req, res) => {
  const { sender, reciver , msg } = req.body;
if(! (sender && reciver && msg)){
  res.json({input: "notComplete"});
}else{
  try{
    msgFunc.createMessage(sender, reciver,msg);
    res.json({ id_Exéditeur:sender,id_Destnataire:reciver,contennues :msg });
  }catch{
    res.json({succes:false});
  }
}
};
// get messages
const getAllMsgOrderByDate = async (req, res) => {
  msgFunc.getMessages().then((r) => {
    res.json(r);
  });
};
const deleteAllMsgOfUser = async (req,res) =>{
  const idSender = req.params.idSender;
  const idRecever = req.params.idRecever;
  if(!(idSender && idRecever)){
    res.json({input: "notComplete"});
  }else{
    try{
      const result = await msgModel.deleteMany({id_Exéditeur:idSender,id_Destnataire:idRecever});
      res.json({succes:true});
    }catch{
      res.json({"succes":false});
    }
  }
  //id_Exéditeur id_Destnataire
}
const deleteOneMsg = async (req,res) => {
  const idMsg=req.params.idMsg;
  const idUser=req.params.idUser;
  if(!(idMsg && idUser)){
          res.json({input: "notComplete"});
  }else{
      try{
          await msgModel.deleteOne({_id:idMsg,id_Exéditeur:idUser});
          res.json({"succes":true});
      }catch{
          res.json({"succes":false});
      }
  }
}
// this may use by admins only
const deleteAllMsg = async (req,res) => {
  try{
    await msgModel.deleteMany();
    res.json({"succes":true});
}catch{
    res.json({"succes":false});
}
}
module.exports = {
  createMsgController,
  getAllMsgOrderByDate,
  deleteAllMsgOfUser,
  deleteOneMsg,
  deleteAllMsg
};