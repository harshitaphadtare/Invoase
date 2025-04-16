import express from "express";
import dotenv from "dotenv";
import cors from "cors";


//app config
const app = express();
const port = process.env.PORT || 4000;

//middlewares
app.use(express.json());
app.use(cors());

//api routes
app.get("/", (req, res) => {
    res.send("API WORKING!");
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
