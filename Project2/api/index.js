const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors =require("cors");
dotenv.config();
mongoose.set('strictQuery', true);
const connect = () => {
    mongoose
      .connect(process.env.MONGO)
      .then(() => {
        console.log("Connected to DB");
      })
      .catch((err) => {
        throw err;
      });
  };
const name = require("./routes/nameRoute");
const auth = require("./routes/authRoutes");
app.use(cors())
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));


app.use("/api/v2",name);
app.use("/api/v4",auth);

app.listen(8000,()=>{
    connect();
  console.log("sdfdf")
  
  })
 
