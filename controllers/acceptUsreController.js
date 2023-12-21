const userFunc = require("../crud/crudUser");
const alert=require("../crud/crudAlertMessage")
const findUnacceptedUserControlle = async (req, res) => {
 /* const { userInfo, sessionId } = req.currentUser;

  if (!userInfo || userInfo.role !== "ADMIN") {
    return res.status(500).json({
      error: "You're Not Authorized to access this recource. ADMIN ONLY",
    });
  }

  console.log(req.currentUser);*/

  userFunc.findUnacceptedUser().then((r) => {
    res.json(r);
  });
};

const acceptUserControlle = async (req, res) => {
  /*const { userInfo, sessionId } = req.currentUser;

  if (!userInfo || userInfo.role !== "ADMIN") {
    return res.status(500).json({
      error: "You're Not Authorized to access this recource. ADMIN ONLY",
    });
  }*/
if(! req.params.idUser){
  res.json({input: "notComplete"});
}else{
    idUser = req.params.idUser;
  userFunc.updateUser(idUser, { is_accepte: true });
  //000000000000000000000000000000000000000000000
  await alert.createAlert(idUser,{notification:'isAcceptNot',value:true})
  res.json({ success: true });
}

};
module.exports = {
  findUnacceptedUserControlle,
  acceptUserControlle,
};
