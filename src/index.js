import 'dotenv/config';
import express from "express";
import userRouter from "./Modules/Users/user.controller.js";
import messageRouter from "./Modules/Messages/message.controller.js";
import dbConnection from "./DB/db.connection.js";
// import crypto from "crypto";
const app = express();

//parsing middleware
app.use(express.json());

//Handle routes
app.use("/users", userRouter);
app.use("/messages", messageRouter);

//databse 
dbConnection();

//Error Handling Middleware
app.use(async(err,req,res,next)=>{
    console.log(err.stack);
    if(req.session && req.session.inTransaction()){
        // abort transaction
        await req.session.abortTransaction()
        //end session
        req.session.endSession()
        console.log("The transaction is aborted")
    }
    res.status(err.cause||500 ).json({message:"somthing broke!",err:err.message,stack:err.stack});
})

//Not Found Middleware
app.use((req,res)=>{
    res.status(404).json("Not Found!");
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port 3000`);
});

// console.log(crypto.randomBytes(32).toString('hex'))