const express = require("express");
const router = express.Router();
const alertController=require("../controllers/alertController");

const {
  deleteAlerteControll,
  getAlertesControll,
  getAlertsAcceptUser
} = require("../controllers/alertController");

router.route("/alert/:idAlert").delete(deleteAlerteControll);
router.route("/alert").get(getAlertesControll);
//getAlertsAcceptUser
router.route('/alert/acceptUser').get(getAlertsAcceptUser);

// get alerts not vue 
//update qst alert
router.route('/alert/updateQst/Nvue/:idUser').get(alertController.getAlertUpdateQstNvue);
// update updateQuestionnaire
router.route('/alert/updateQuestionnaire/Nvue/:idUser').get(alertController.getAlertUpdateQuestionnaireNvue);
// is accepted alert
router.route('/alert/isAcceptNot/Nvue/:idUser').get(alertController.getAlertIsAcceptNotNvue);
// cnatct alert
router.route('/alert/contact/Nvue/:idUser').get(alertController.getAlertContactNvue);


// VUE
// put the alert as reading (ya3ni rahou chaf notification) isAceepted
router.route('/alert/isAcceptNot/readAlert/:idUser').get(alertController.getAlertIsAcceptNotReadAlert);
// put the alert as reading (ya3ni rahou chaf notification) updateQuestionnaire
router.route('/alert/updateQuestionnaire/readAlert/:idUser').get(alertController.alertUpdateQuestionnaireReadAlert);
// put the alert as reading (ya3ni rahou chaf notification) update qst alert
router.route('/alert/updateQst/readAlert/:idUser').get(alertController.alertUpdateQstReadAlert);
// put the alert as reading (ya3ni rahou chaf notification) alertContact
router.route('/alert/contact/readAlert/:idUser').get(alertController.alertContactReadAlert);

// get alerts  vue 
//update qst alert
router.route('/alert/updateQst/vue/:idUser').get(alertController.getAlertUpdateQstVue);
// update updateQuestionnaire
router.route('/alert/updateQuestionnaire/vue/:idUser').get(alertController.getAlertUpdateQuestionnaireVue);
// is accepted alert
router.route('/alert/isAcceptNot/vue/:idUser').get(alertController.getAlertIsAcceptNotVue);
// contact alert
router.route('/alert/contact/vue/:idUser').get(alertController.getAlertContactVue);

router.post('/createNotification',alertController.createOneAlert);
router.post('/getNotifications/:idUser',alertController.getNotificationForUser);

module.exports = router;
