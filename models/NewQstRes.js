const mongoose = require("mongoose");
const {Schema,SchemaTypes} = mongoose;
const newQstResSchema = new Schema({
    surveyName : String,
    patient : {
        type: SchemaTypes.ObjectId,
        ref: "Utilisateur",
    },
    patientAnswers : [Object],
    result : Number ,
    comment : String 

});
module.exports = mongoose.model("newQstRes", newQstResSchema);