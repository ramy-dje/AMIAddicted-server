const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const questionchema = new Schema({
  textdques: String,
  typeques: String,
  optionsrep: String,
  pointattquest: Number,
  orderaffquest: String,
  eventdepques: String,
  repquest:[Object], //reponse de question
});
module.exports = mongoose.model("Question", questionchema);
