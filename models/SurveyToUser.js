const mongoose = require("mongoose");
const {Schema,SchemaTypes} = mongoose;
const SurveyToUserSchema = new Schema({
    userId :{
        type: SchemaTypes.ObjectId,
        ref: "Utilisateur",
      },
    survey : Object
});
module.exports = mongoose.model("SurveyToUser", SurveyToUserSchema);