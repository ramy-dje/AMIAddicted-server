const express = require("express");
const router = express.Router();
const msgCont = require('../controllers/messageController');
const {
  createMsgController,
  getAllMsgOrderByDate,
} = require("../controllers/messageController");

router.post("/message",createMsgController);
router.get("/message",getAllMsgOrderByDate);
// hadi tfasi les msgs kamel mais ta3 user wa7d m3a recever wahd
router.delete('/message/allOfOne/:idSender/:idRecever',msgCont.deleteAllMsgOfUser);

// hadi tfasi msg wahd brk 
router.delete('/mymessage/:idUser/:idMsg',msgCont.deleteOneMsg);
router.delete('/anymessage/:idMsg',msgCont.deleteMessage);

// hadi tfassi klch , ya3ni les msgs kaml
router.delete('/message/all',msgCont.deleteAllMsg);
module.exports = router;
