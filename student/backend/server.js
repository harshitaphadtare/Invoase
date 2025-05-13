import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import studentRoutes from "./routes/studentRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import bankDetailsRoutes from "./routes/bankDetailsRoutes.js";  
import documentRoutes from "./routes/documentRoute.js";
import gstRoutes from "./routes/gstRoute.js";  
import reimbRoutes from "./routes/reimbRoute.js";
import allDocRoute from './routes/allDocRoute.js'
// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB and Cloudinary
await connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API routes
app.get("/", (req, res) => {
    res.send("API WORKING!");
});

app.use("/api/student", studentRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/bank-details", bankDetailsRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/gst', gstRoutes);
app.use('/api/reimb', reimbRoutes);
app.use("/api/alldocuments", allDocRoute);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});