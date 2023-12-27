const mongoose = require("mongoose");
const bodyParser = require("body-parser");
mongoose
.connect("mongodb+srv://lokman:5dQqrLZAxFGiWP4q@dawcluster.vxgdsew.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    app.listen(3000);
    console.log("db connected");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
  //const crud =require("./crud/crudAlertMessage");
  //crud.createAlert("658030612247ba081110ddc4",{});
  const express=require("express");
  const app =express();
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.json({limit:'20mb'}));
  const cont =require("./controllers/questionController");
  const cont2 =require("./controllers/messageController");
  const rout=require("./routes/messageRouter");
const gen=require('./controllers/generalChatController');
app.post("/gen",gen.addGeneraleChat);
app.get("/",(req,res)=>{
  res.sendFile('./public/index.html', {root:__dirname});
});
app.use(rout);
//app.get('/gen/all',gen.getAllGeneralChat);
//app.get('/d', cont2.deleteAllMsg);
//app.post("/msg",cont2.createMsgController);
// /d/65801fb5cfa9ba42a225f3d0/658c3da467d579a41db5f7cf