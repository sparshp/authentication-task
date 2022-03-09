const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = process.env.PORT || "8000";
var cors = require('cors');
const authRoute = require("./route/auth")


const app = express();
dotenv.config();

app.use(cors({ origin: true, credentials: true }));




mongoose
  .connect(
    process.env.MONGO_URL
  )
  .then(() => console.log("db connecton successfull"))
  .catch((err) => console.log(err));


  //Routes
app.use(express.json());
app.use("/api/auth", authRoute)

app.listen(port, () => {
  console.log("backend is running");
});
