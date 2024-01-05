const express = require("express");
const router = express.Router();
const genChaCont = require('../controllers/generalChatController');
// add new msg in general chat (a5dem b "id_Exéditeur","contennues" f body par ce que lazem haka
// ba3d bah ndir test)
router.post('/generalChat',genChaCont.addGeneraleChat);

// get all msg from general chat 
router.get('/generalChat',genChaCont.getAllGeneralChat);

// hna delete

// delete one msg only 
router.delete('/generalChat/one/:idMsg',genChaCont.deleteOneGeneralChat);

// delete all mesages from generale chat of one user only
router.delete('/generalChat/all/:idUser',genChaCont.deleteAllGeneralChatOfOneUser);

// delete all msgs from general chat (you can use it for admins)
router.delete('/generalChat/all',genChaCont.deleteAllGeneralChat)
module.exports = router;
