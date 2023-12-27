const qstFunc = require("../crud/crudQuestion");
const allDoctorsAndAdmins= require("../crud/crudUser");
const alertQst= require("../crud/crudAlertMessage");
const newQst = require('../models/NewQuestions');
// ############################# CREATE
// create question
const createQstController = async (req, res) => {
  const {textdques,typeques,optionsrep,pointattquest,orderaffquest,eventdepques}=req.body;
  if(!( textdques && typeques && optionsrep && pointattquest && orderaffquest && eventdepques)){
    res.json({input: "notComplete"});
  }else{
    const idQ = await qstFunc.createQst(req.body);
    res.json({ success: true, idQst: idQ });
  }
};

// create reponse de question
const createReponseQstController = async (req, res) => {
  const {repnsquest,scoreattrrep,cmntrreponse,autresattrrepns} = req.body;
  if(!(repnsquest && scoreattrrep && cmntrreponse && autresattrrepns)){
    res.json({input: "notComplete"});
  }else{
    const idRQ = await qstFunc.createRepenseQst(req.body);
    res.json({ success: true, idRepenseQst: idRQ });
  }
};

//    create questionner
// you must put the id of patient in url
const createQuestionnaireController = async (req, res) => {
  const { idPatient,datedquest,questions,autresattrques} = req.body;
  if(!(idPatient && datedquest && questions && autresattrques)){
    res.json({input: "notComplete"});
  }else{
    const idQ = await qstFunc.createQuestionnaire(idPatient, req.body);
    res.json({ success: true, idQuest: idQ });
  }
};

//    ############################## GET
//    get questions
const getAllQstController = async (req, res) => {
  try{
    qstFunc.getAllQst().then((r) => {
      res.json(r);
    });
  }catch{
    res.json({ success: false});
  }
};

//    get all repense of questions
const getAllRepenseQstController = async (req, res) => {
  try{
    qstFunc.getAllReponseQst().then((r) => {
      res.json(r);
    });
  }catch{
    res.json({ success: false});
  }
};

//      get All Questionners
const getAllQuestionnaireController = async (req, res) => {
  try{
    qstFunc.getAllQuestionnaire().then((r) => {
      res.json(r);
    });
  }catch{
    res.json({ success: false});
  }
};

// get just one you must put the id in url
const getQstController = async (req, res) => {
  try{
    idQst = req.params.idQst;
    qstFunc.getQst(idQst).then((r) => {
      res.json(r);
    });
  }catch{
    res.json({ success: false});
  }
};

const getRepenseQstController = async (req, res) => {
  try{
    idRQst = req.params.idRQst;
    qstFunc.getReponseQst(idRQst).then((r) => {
      res.json(r);
    });
  }catch{
    res.json({ success: false});
  }
};

const getQuestionnerController = async (req, res) => {
  try{
    idQuestionner = req.params.idQuestionner;
    qstFunc.getQuestionnaire(idQuestionner).then((r) => {
      res.json(r);
    });
  }catch{
    res.json({ success: false});
  }
};

// ############################ DELETE
// lazem t7ot l id f url

const deleteQstController = async (req, res) => {
  try{
    idQst = req.params.idQst;
    await qstFunc.deleteQst(idQst);
    res.json({ success: true });
  }catch{
    res.json({ success: false});
  }
};

const deleteRepQstController = async (req, res) => {
  try{
    idRepQst = req.params.idRepQst;
    await qstFunc.deleteRepQst(idRepQst);
    res.json({ success: true });
  }catch{
    res.json({ success: false});
  }
};

const deleteQuestionnaireController = async (req, res) => {
  try{
    idQuestionnaire = req.params.idQuestionnaire;
    await qstFunc.deleteQuestionnaire(idQuestionnaire);
    res.json({ success: true });
  }catch{
    res.json({ success: false});
  }
};
// ################################ UPDATE
const updateQstController = async (req, res) => {
  if(! req.body){
    res.json({input: "notComplete"});
  }else{
    try{
      let idQst = req.params.idQst;
      // in the body you must have the new information
      // to update
      await qstFunc.updateQst(idQst, req.body);
      allDoctorsAndAdmins.getUsers().then((r)=>{
        for (let i = 0 ;i<=r.length-1;i++){
          if(r[i].role == 'ADMIN' || r[i].role == 'ADMIN'){
            alertQst.createAlert(r[i]._id,{notification:'updateQst',value:true});
          }
        }
      })
      res.json({ success: true });
    }catch{
      res.json({ success: false});
    }
  }
};

const updateRepQstController = async (req, res) => {
  if(! req.body){
    res.json({input: "notComplete"});
  }else{
    try{
      idRepQst = req.params.idRepQst;
      // in the body you must have the new information
      // to update
      await qstFunc.updateRepenseQst(idRepQst, req.body);
      res.json({ success: true });
    }catch{
      res.json({ success: false});
    }
  }
};

const updateQuestionnaireController = async (req, res) => {
  if(req.body){
    res.json({input: "notComplete"});
  }else{
    try{
      idRepQuestionnaire = req.params.idRepQuestionnaire;
      // in the body you must have the new information
      // to update
      await qstFunc.updateQuestionnaire(idRepQuestionnaire, req.body);
      // the alert
      await allDoctorsAndAdmins.getUsers().then((r)=>{
        for (let i = 0 ;i<=r.length-1;i++){
          if(r[i].role == 'ADMIN' || r[i].role == 'ADMIN'){
            alertQst.createAlert(r[i]._id,{notification:'updateQuestionnaire',value:true});
          }
        }
      })
      res.json({ success: true });
    }catch{
      res.json({ success: false});
    }
  }

};

//################################ ALL ABOUT NEW QUESTION #########
const getNewQst = async(req,res)=>{
  try{
      await newQst.find().then((r)=>{
          res.json(r);
      })
  }catch{
      res.json({succes:false});
  }
}

const deleteNewQst = async (req,res)=>{
  const {listName}=req.body;
  if(! listName){
    res.json({input: "notComplete"});
  }else{
    try{
        await newQst.updateOne({},{$pull :{surveysList:{listName:listName}}});
        res.json({succes:true});
    }catch{
        res.json({succes:false});
    }
  }
}


const createNewQst = async (req,res)=>{
  const {list,listName}=req.body;
  if(! (list && listName)){
    res.json({input: "notComplete"});
  }else{
    try{
        const result = await newQst.find();
        if(result.length==0){
          const create = await new newQst({surveysList:{listName:listName,list:list}});
          create.save();
        }else{
          let check=false;
          const result= await newQst.findOne();
          for(let i = 0;i<=result.surveysList.length-1;i++){
              if(result.surveysList[i].listName==listName){
                  check=true;
                  res.json({'false':'this list name is already exist'});
                  i=result.surveysList.length;
              }
          }
          if(check==false){
            //await newQst.updateOne({},{$pull :{surveysList:{listName:listName}}});
            await newQst.updateOne({},{$push :{surveysList:{listName:listName,list:list}}});
            res.json({succes:true});
          }
        }
        //let n=await new newQst();
        //n.save()
    }catch{
        res.json({succes:false});
    }
  }
}
module.exports = {
  createNewQst,
  deleteNewQst,
  getNewQst,
  updateQuestionnaireController,
  updateRepQstController,
  updateQstController,
  deleteQuestionnaireController,
  deleteRepQstController,
  deleteQstController,
  createQstController,
  createReponseQstController,
  createQuestionnaireController,
  getAllQstController,
  getAllRepenseQstController,
  getAllQuestionnaireController,
  getQstController,
  getRepenseQstController,
  getQuestionnerController,

};
