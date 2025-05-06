
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();


const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded())




app.use("/", (req, res ) =>{
    res.send("here u r in main page")
})

console.log("tests   sss")
const PORT =process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on this ${PORT} dear my_Lady/Mr`);
})