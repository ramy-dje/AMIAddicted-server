const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const authRouter = require("./routes/authRoutes");
const acceptRouter = require("./routes/acceptRoutes");
const messageRouter = require("./routes/messageRouter");
const allertRouter = require("./routes/alertRoutes");
const addeddRoutes = require("./routes/addeddRoutes");
const NewQstResRoutes = require("./routes/NewQstResRoutes");
const SurveyToUserRoutes = require("./routes/SurveyToUserRoutes");

const generalChatRoutes = require("./routes/generalChatRoutes");



const cors = require("cors");

///const { currentUser } = require("./middlewares/authMiddleware");

require("dotenv").config({ path: ".env" });
const MONGODB_URL = process.env.MONGODB_URL;

const app = express();
app.use(cors());
app.listen(3000);
console.log("Listening on port 3000");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "20mb" }));

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

//app.use(currentUser);

app.use(
  "/api",
  authRouter,
  acceptRouter,
  messageRouter,
  allertRouter,
  addeddRoutes,
  generalChatRoutes,
  SurveyToUserRoutes,
  NewQstResRoutes
);

app.get("/", (req, res) => {
  res.send("ImIAddicted Is running!");
});
