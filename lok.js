const mongoose = require("mongoose");
const bodyParser = require("body-parser");
mongoose
  .connect("mongodb+srv://lokman:5dQqrLZAxFGiWP4q@dawcluster.vxgdsew.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
  //const crud =require("./crud/crudAlertMessage");
  //crud.createAlert("658030612247ba081110ddc4",{});
  const express=require("express");
  const app =express();
  const cont =require("./controllers/questionController");
  const cont2 =require("./controllers/contact");
  app.listen(3000);
  const rout=require("./routes/contactRoutes");
  app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({limit:'20mb'}));
  app.get("/",(req,res)=>{
    res.sendFile("./public/index.html",{root:__dirname})
  })
  const m =require('./models/NewQuestions');
app.post("/",cont.deleteNewQst);