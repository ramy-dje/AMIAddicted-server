
const newQst = require('../models/NewQuestions');


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
  console.log(list,listName)
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
  
};
