import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken"

let app = express();

app.use(bodyParser.json()); //arrange requested body - middle man
app.use((req,res,next)=>{

  let token = req.header
  ("Authorization")

  // decode user token
  if(token!=null){
    token = token.replace("Bearer ","")

    jwt.verify(token,"kv-secret-89",
      (err,decoded)=>{
        if(!err){
          req.user = decoded
        }
      }
    )

  }

  next()

})


let mongoUrl = "mongodb+srv://Hasala:gRWgzehsjpHNrePU@cluster0.ep5aw.mongodb.net/skyrec?retryWrites=true&w=majority&appName=Cluster0" //backend connection

mongoose.connect(mongoUrl)

let connection = mongoose.connection
connection.once("open",()=>{
    console.log("Connected to MongoDB")
})


app.use("/api/users",userRouter)
app.use("/api/products",productRouter)

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
