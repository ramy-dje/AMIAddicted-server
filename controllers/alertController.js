// const alert=require("./crud/crudAlertMessage");
const alertModel= require("../models/Alerts");
const alertFunc = require("../crud/crudAlertMessage");
// delete alerts
// hadi te3 delete lazem ta3tiha id f url te3 alert
const deleteAlerteControll = async (req, res) => {
  if(! req.params.idAlert){
    res.json({input: "notComplete"});
  }else{
      const idAlert = req.params.idAlert;
      alertFunc.deleteAlert(idAlert);
      res.json({ success: "success" });
  }

};

// get all alerts
const getAlertesControll = async (req, res) => {
  alertFunc.getAlerts().then((r) => {
    res.json(r);
  });
};
// 00000000000000000000000000000000000
// get alerts of accept users
const getAlertsAcceptUser =async (req,res)=>{
  alertFunc.getAlert('isAcceptNot').then((r)=>{
    res.json(r);
  })
}

const getAlertUpdateQstNvue = async (req,res)=>{
  if(! req.params.idUser){
    res.json({input: "notComplete"});
  }else{
    await alertModel.find({id_Utilisateur:req.params.idUser,notification :'updateQst',vue:false}).sort({ date_alert: 1 }).
    then((r)=>{
    res.send(r);
  }); 
  }

}

const getAlertUpdateQuestionnaireNvue = async (req,res)=>{
  if(! req.params.idUser){
    res.json({input: "notComplete"});
  }else{
    await alertModel.find({id_Utilisateur:req.params.idUser,notification :'updateQuestionnaire',vue:false}).sort({ date_alert: 1 }).
    then((r)=>{
      res.send(r);
    });
  }
}

const getAlertIsAcceptNotNvue = async (req,res)=>{
  if(! req.params.idUser){
    res.json({input: "notComplete"});
  }else{
    await alertModel.find({id_Utilisateur:req.params.idUser,notification :'isAcceptNot',vue:false}).sort({ date_alert: 1 }).
    then((r)=>{
      res.send(r);
    });
  }
}

const getAlertContactNvue = async (req,res)=>{
  if(! req.params.idUser){
    res.json({input: "notComplete"});
  }else{
    await alertModel.find({id_Utilisateur:req.params.idUser,notification :'alertContact',vue:false}).sort({ date_alert: 1 }).
    then((r)=>{
      res.send(r);
    });
  }
}

//#################  VUE ###############
// put the alert as reading (ya3ni rahou chaf notification) isAceepted

const getAlertIsAcceptNotReadAlert = async (req,res)=>{
  //{notification :'isAcceptNot',vue:false}
  try{
   let idUser=req.params.idUser;
   await alertModel.updateMany({id_Utilisateur:idUser,notification:'isAcceptNot'},{vue:true});
   res.json({ success: true });
  }catch{
    res.json({ success: false});
  }
}

const alertUpdateQuestionnaireReadAlert = async (req,res)=>{
  //{notification :'isAcceptNot',vue:false}
  try{
      let idUser=req.params.idUser;
    await alertModel.updateMany({id_Utilisateur:idUser,notification:'updateQuestionnaire'},{vue:true});
    res.json({ success: true });
  }catch{
    res.json({ success: false});
  }
}

const alertUpdateQstReadAlert = async (req,res)=>{
  //{notification :'isAcceptNot',vue:false}
  try{
      let idUser=req.params.idUser;
  await alertModel.updateMany({id_Utilisateur:idUser,notification:'updateQst'},{vue:true});
  res.json({ success: true });
  }catch{
    res.json({ success: false});
  }
}

const alertContactReadAlert = async (req,res)=>{
  //{notification :'isAcceptNot',vue:false}
  try{
      let idUser=req.params.idUser;
  await alertModel.updateMany({id_Utilisateur:idUser,notification:'alertContact'},{vue:true});
  res.json({ success: true });
  }catch{
    res.json({ success: false});
  }
}

// get alerts  vue 
//update qst alert
const getAlertUpdateQstVue = async (req,res)=>{
  if(! req.params.idUser){
    res.json({input: "notComplete"});
  }else{
    await alertModel.find({id_Utilisateur:req.params.idUser,notification :'updateQst',vue:true}).sort({ date_alert: 1 }).
    then((r)=>{
      res.send(r);
    });
  }
}
//update updateQuestionnaire
const getAlertUpdateQuestionnaireVue = async (req,res)=>{
  if(! req.params.idUser){
    res.json({input: "notComplete"});
  }else{
    await alertModel.find({id_Utilisateur:req.params.idUser,notification :'updateQuestionnaire',vue:true}).sort({ date_alert: 1 }).
    then((r)=>{
      res.send(r);
    });
  }
}

// is accepted alert
const getAlertIsAcceptNotVue = async (req,res)=>{
  if(! req.params.idUser){
    res.json({input: "notComplete"});
  }else{
    await alertModel.find({id_Utilisateur:req.params.idUser,notification :'isAcceptNot',vue:true}).sort({ date_alert: 1 }).
    then((r)=>{
      res.send(r);
    });
  }
}
// contact alert
const getAlertContactVue = async (req,res)=>{
  if(! req.params.idUser){
    res.json({input: "notComplete"});
  }else{
    await alertModel.find({id_Utilisateur:req.params.idUser,notification :'alertContact',vue:true}).sort({ date_alert: 1 }).
    then((r)=>{
      res.send(r);
    });
  }
}

const createOneAlert = async (req,res)=>{
    const {idUser,notification} = req.body
    if(!idUser && !notification){
      res.json({success:"false",message:'empty fields'})
    }else{
      const res = await alertModel.create({id_Utilisateur:idUser,notification : notification })
      res.json({success:true})
    }
}
const getNotificationForUser = async(req,res)=>{
  const {idUser} = req.params;
  if(! idUser){
    res.json({input: "notComplete"});
  }else{
    const res =await alertModel.find({id_Utilisateur:idUser}).sort({ date_alert: 1 });
    await alertModel.updateMany({id_Utilisateur:idUser},{vue:true});
    res.json({success:true})
  }
}


module.exports = {
  getAlertUpdateQstNvue,
  deleteAlerteControll,
  getAlertesControll,
  getAlertsAcceptUser,
  getAlertUpdateQuestionnaireNvue,
  getAlertIsAcceptNotNvue,
  getAlertContactNvue,
  getAlertIsAcceptNotReadAlert,
  alertUpdateQuestionnaireReadAlert ,
  alertUpdateQstReadAlert,
  alertContactReadAlert,
  getAlertUpdateQstVue,
  getAlertUpdateQuestionnaireVue,
  getAlertIsAcceptNotVue,
  getAlertContactVue,
  createOneAlert,
  getNotificationForUser
};
