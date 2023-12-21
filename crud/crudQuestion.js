const question=require("../models/Question");
const Questionnaire=require("../models/Questionnaire");
const alert=require('../models/Alerts');
const Rpnsquest=require("../models/Rpnsquest");
// ################################# CREATE ##############################
const createQst=async(qstInfo)=>{
    const create = new question(qstInfo);
    await create.save();
    return create._id;
}

const createRepenseQst=async(RqstInfo)=>{
    const create = new Rpnsquest(RqstInfo);
    await create.save();
    return create._id;
}

const createQuestionnaire=async (idPatient,qst)=>{
    let create = new Questionnaire(qst);
    await create.save();
    await updateQuestionnaire(create._id,{id_Patient:idPatient})
    return create._id;
}
// ################################### GET
const getAllQst=async ()=>{
    const result= await question.find();
    return result;
}
const getQst=async (idQst)=>{
    try{
    const qst= await question.findOne({_id:idQst});
    if(qst)
    return qst;
    else
    console.log("this question is not existe"); 
    } catch (error) {
        console.error(error);
    }
}

const getAllQuestionnaire=async ()=>{
    const result= await Questionnaire.find();
    return result;
}
const getQuestionnaire= async (idQuestionnaire)=>{
    try{
        const qst= await Questionnaire.findOne({_id:idQuestionnaire});
        if(qst)
        return qst;
        else
        console.log("this question is not existe"); 
        } catch (error) {
            console.error(error);
        }
}

const getAllReponseQst=async ()=>{
    const result= await Rpnsquest.find();
    return result;
}
const getReponseQst=async (idRepQst)=>{
    try{
        const Rpsqst= await Rpnsquest.findOne({_id:idRepQst});
        if(Rpsqst)
        return Rpsqst;
        else
        console.log("this question is not existe"); 
        } catch (error) {
            console.error( error);
        }
}

// ################################### UPDATE
const updateQst = async (QstId, newQstInfo) => {
    await question.updateOne({_id: QstId }, newQstInfo);
};

const updateRepenseQst = async (RepQstId, newRepQstInfo) => {
    await Rpnsquest.updateOne({_id: RepQstId }, newRepQstInfo);
};

const updateQuestionnaire = async (QuestionnaireId, newQuestionnaireInfo) => {
    await Questionnaire.updateOne({_id: QuestionnaireId }, newQuestionnaireInfo);
};

// ################################ DELETE
const deleteQst= async (idQst)=>{
    await question.deleteOne({ _id: idQst});
}

const deleteRepQst= async (idRepQst)=>{
    await Rpnsquest.deleteOne({ _id: idRepQst});
}

const deleteQuestionnaire= async (idQuestionnaire)=>{
    await Questionnaire.deleteOne({ _id: idQuestionnaire});
}
module.exports={
    createQst,
    createRepenseQst,
    createQuestionnaire,
    getQst,
    getAllQst,
    getAllQuestionnaire,
    getAllReponseQst,
    getReponseQst,
    getQuestionnaire,
    updateQst,
    updateRepenseQst,
    updateQuestionnaire,
    deleteQst,
    deleteRepQst,
    deleteQuestionnaire
}