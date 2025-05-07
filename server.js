
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.js";


dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded())

// we may do it json jobs by using bodyParser
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded())

app.use("/api", authRouter);   //  /api/register   in frontend  we use this api 

app.use("/", (req, res ) =>{
    res.send("here u r in main page")
})

const PORT =process.env.PORT || 5000;


// db();  asuuuming we r done mongodb connection in db.js file


app.listen(PORT, () => {
    console.log(`Server is running on this ${PORT} dear my_Lady/Mr`);
})

//1.43