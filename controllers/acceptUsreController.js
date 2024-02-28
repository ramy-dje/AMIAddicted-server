const userFunc = require("../crud/crudUser");
const alert=require("../crud/crudAlertMessage")

const findUnacceptedUserControlle = async (req, res) => {
  userFunc.findUnacceptedUser().then((r) => {
    res.json(r);
  });
};

const acceptUserControlle = async (req, res) => {
  
if(! req.params.idUser){
  res.json({input: "notComplete"});
}else{
    idUser = req.params.idUser;
  userFunc.updateUser(idUser, { is_accepte: true });
  res.json({ success: true });
}

};
module.exports = {
  findUnacceptedUserControlle,
  acceptUserControlle,
};
