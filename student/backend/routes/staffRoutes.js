import express from "express";
import {
    registerStaff,
    loginStaff,
    getStaffProfile,
    updateStaffProfile,
    changePassword,
    getAllStaff,
    updateStaffVerification
} from "../controllers/staffController.js";

const staffRouter = express.Router();

// Public routes
staffRouter.post("/signup", registerStaff);
staffRouter.post("/login", loginStaff);

// Protected routes
staffRouter.get("/profile",  getStaffProfile);
staffRouter.patch("/profile",  updateStaffProfile);
staffRouter.put("/change-password",  changePassword);


export default staffRouter;