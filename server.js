import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import user_route from "./routes/user_route.js";
import { mongoose_connection } from "./db/mongodb.js";
import  auth from "./routes/auth.js"
import { errorHandler } from "./middlewares/errorHendeler.js";
import cookieParser from "cookie-parser";


// confing dotenv
dotenv.config();
const PORT = process.env.PORT || 6060;

// init express
const app = express();

// app suffort 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

// static folder 
app.use(express.static("public"));

// useing routes 
app.use("/api/v1", user_route);


// authorigaion 
app.use(auth)

//      ERROT hendeler 
app.use(errorHandler)

// listen server
app.listen(PORT, ()=>{
    mongoose_connection()
    console.log(` server is ranning on ${PORT} `.bgGreen);
})