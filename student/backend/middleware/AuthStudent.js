import jwt from "jsonwebtoken";
import Student from "../models/Student.js";

// Middleware to authenticate student
export const authStudent = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Extract token from Bearer format
        const studentToken = authHeader.split(' ')[1];
        
        const decoded = jwt.verify(studentToken, process.env.JWT_SECRET);
        
        const student = await Student.findById(decoded.id);
        if (!student) {
            return res.status(401).json({ message: "Student not found" });
        }

        req.student = student;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid token" });
        }
        res.status(500).json({ message: "Server error" });
    }
}   
