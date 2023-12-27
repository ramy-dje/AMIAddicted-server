const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SchemaTypes = mongoose;
const GeneralChatSchema = new Schema({
  id_Exéditeur: {
    type: SchemaTypes.ObjectId,
    ref: "Utilisateur",
  },
  contennues: String,
  date_envoi: {
    type: Date,
    default: Date.now(), // Sets the default value to the current date and time
  },
});
module.exports = mongoose.model("GeneralChat", GeneralChatSchema);
