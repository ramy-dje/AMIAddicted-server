const express = require("express");
const router = express.Router();
const msgCont = require('../controllers/messageController');
const {
  createMsgController,
  getAllMsgOrderByDate,
} = require("../controllers/messageController");

router.route("/message").post(createMsgController);
router.route("/message").get(getAllMsgOrderByDate);
// hadi tfasi les msgs kamel mais ta3 user wa7d m3a recever wahd
router.delete('/message/allOfOne/:idSender/:idRecever',msgCont.deleteAllMsgOfUser);

// hadi tfasi msg wahd brk 
router.delete('/message/one/:idUser/:idMsg',msgCont.deleteOneMsg);

// hadi tfassi klch , ya3ni les msgs kaml
router.delete('/message/all',msgCont.deleteAllMsg);
module.exports = router;
