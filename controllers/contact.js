const userModel =require('../models/Utilisateur');
const alertContact=require('../crud/crudAlertMessage');

const addContactsController =async (req,res)=>{
    try{
        let userId=req.params.userId;
        console.log(userId);
        console.log(req.body)
        // req.body is contain an array of object of all information of the contacts such as user id ,nom......etc
        await userModel.updateOne({_id:userId},{contacts:req.body});
        for (let i=0;i<=req.body.length-1;i++){
            await alertContact.createAlert(req.body[i].userId,{notification :'alertContact',value:true})
        }
        res.json({succes:true});
    }catch{
        res.json({succes:true});
    }
}
module.exports={
    addContactsController
}