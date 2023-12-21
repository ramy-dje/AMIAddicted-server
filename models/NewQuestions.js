const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const QuestionsSchema = new Schema({
    //the new container of lists 
  surveysList : [
    {
        //list name
        listName :String,
        //the old list
        list : [
            {
                question: String,
                answers: [
                    {
                        answer : String,
                        value : Number
                    }
                ]
            }
        ]
    }
  ]
});
module.exports = mongoose.model("NewQuestions", QuestionsSchema);
