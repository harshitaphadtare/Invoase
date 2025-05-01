import express from "express";
import {
    registerStudent,
    loginStudent,
    getStudentProfile,
    updateStudentProfile,
    changePassword
} from "../controllers/StudentController.js";
import { authStudent } from "../middleware/AuthStudent.js";

const studentRouter = express.Router();

// Public routes
studentRouter.post("/register", registerStudent);
studentRouter.post("/login", loginStudent);

// Protected routes
studentRouter.get("/profile",authStudent, getStudentProfile);
studentRouter.patch("/profile",authStudent, updateStudentProfile);
studentRouter.put("/change-password",authStudent, changePassword);

export default studentRouter; 