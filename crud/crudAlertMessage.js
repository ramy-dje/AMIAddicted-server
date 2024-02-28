const alert = require("../models/Alerts");
const user = require("../crud/crudUser");
const stat_user = require("../models/Stat_user");
const message = require("../models/Message");
const { format } = require("date-fns");
// ####################### CREATE

const createAlert = async (userId, alertInfo) => {
  try {
    alertInfo.id_Utilisateur = userId;
    user.getUser(userId).then((result) => {
      alertInfo.userInfo = result;
          const create = new alert(alertInfo);
          create.save();      
    });
    // return create._id;
  } catch {
    console.log("there an error ,check your user id ");
  }
};

const createStat_user = async (stat_userInfo) => {
  try {
    const create = new stat_user(stat_userInfo);
    create.save();
    return create._id;
  } catch (err) {
    console.error(err);
  }
};

const createMessage = async (isUserSender, idUserRecever, msg) => {
  try {
    const create = new message({
      id_Exéditeur: isUserSender,
      id_Destnataire: idUserRecever,
      contennues: msg,
    });
    create.save();
    return create._id;
  } catch (err) {
    console.error(err);
  }
};

// ############################## DELETE
const deleteAlert = async (idAlert) => {
  await alert.deleteOne({ _id: idAlert });
};

const deleteMessage = async (idMsg) => {
  await message.deleteOne({ _id: idMsg });
};

const deleteStat_user = async (idStat) => {
  await stat_user.deleteOne({ _id: idStat });
};
const getMessages = async () => {
  const result = await message.find()/*.populate('id_Exéditeur').populate('id_Destnataire')*/.sort({ date_envoi: 1 });
  return result;
};
const getAlerts = async () => {
  const result = await alert.find();
  return result;
};

// 000000000000000000000000000000000000000
const getAlert = async (condition) =>{
 const result= await alert.find({notification:condition});
 return result;
}
module.exports = {
  createAlert,
  createStat_user,
  createMessage,
  deleteAlert,
  deleteMessage,
  deleteStat_user,
  getAlerts,
  getMessages,
  getAlert
};
