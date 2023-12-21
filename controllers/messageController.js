const msgFunc = require("../crud/crudAlertMessage");
// put message
const createMsgController = async (req, res) => {
  const { sender, reciver , msg } = req.body;
if(! (sender && reciver && msg)){
  res.json({input: "notComplete"});
}else{
  msgFunc.createMessage(sender, reciver,msg);
  res.json({ id_Exéditeur:sender,id_Destnataire:reciver,contennues :msg });
}
};

// get messages
const getAllMsgOrderByDate = async (req, res) => {
  msgFunc.getMessages().then((r) => {
    res.json(r);
  });
};
module.exports = {
  createMsgController,
  getAllMsgOrderByDate,
};
