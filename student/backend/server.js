import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import "dotenv/config";
import connectCloudinary from "./config/cloudinary.js";
import studentRoutes from './routes/studentRoutes.js';
import staffRoutes from './routes/staffRoutes.js';

//app config
const app = express();
const port = process.env.PORT || 5000;
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

//api routes
app.get("/", (req, res) => {
    res.send("API WORKING!");
});

app.use('/api/students', studentRoutes);
app.use('/api/staff', staffRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});