const express = require("express");

const router = express.Router();

const {
  updateQuestionnaireController,
  updateRepQstController,
  updateQstController,
  deleteQuestionnaireController,
  deleteRepQstController,
  deleteQstController,
  createQstController,
  createReponseQstController,
  createQuestionnaireController,
  getAllQstController,
  getAllRepenseQstController,
  getAllQuestionnaireController,
  getQstController,
  getRepenseQstController,
  getQuestionnerController,
} = require("../controllers/questionController");

router.route("/question").post(createQstController);
router.route("/response").post(createReponseQstController);
router.route("/questionaire").post(createQuestionnaireController);

router.route("/question").get(getAllQstController);
router.route("/response").get(getAllRepenseQstController);
router.route("/questionaire").get(getAllQuestionnaireController);

router.route("/question/:idQst").get(getQstController);
router.route("/response/:idRQst").get(getRepenseQstController);
router.route("/questionaire/:idQuestionner").get(getQuestionnerController);

router.route("/question/:idQst").delete(deleteQstController);
router.route("/response/:idRepQst").delete(deleteRepQstController);
router
  .route("/questionaire/:idQuestionnaire")
  .delete(deleteQuestionnaireController);

router.route("/question/:idQst").put(updateQstController);
router.route("/response/:idRepQst").put(updateRepQstController);
router
  .route("/questionaire/:idRepQuestionnaire")
  .put(updateQuestionnaireController);

module.exports = router;

