import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import reviewRouter from "./routes/reviewRouter.js";

dotenv.config();

let app = express();

app.use(bodyParser.json()); //arrange requested body - middle man
app.use((req,res,next)=>{

  let token = req.header
  ("Authorization")

  // decode user token
  if(token!=null){
    token = token.replace("Bearer ","")

    jwt.verify(token, process.env.JWT_SECRET,
      (err,decoded)=>{
        if(!err){
          req.user = decoded
        }
      }
    )

  }

  next()

})


let mongoUrl = process.env.MONGO_URL; //backend connection

mongoose.connect(mongoUrl)

let connection = mongoose.connection
connection.once("open",()=>{
    console.log("Connected to MongoDB")
})


app.use("/api/users",userRouter)
app.use("/api/products",productRouter)
app.use("/api/reviews",reviewRouter)

app.listen(3000, () => {
  console.log("server is running on port 3000");
});




// user
// "email": "john.doe@example.com",
//     "password": "password123",

// admin
// "email": "john.dooo@example.com",
//     "password": "password123",