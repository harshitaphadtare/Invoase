import express from "express";
import { saveBankDetails, getBankDetails } from "../controllers/BankDetailsController.js";

const bankDetailsRouter = express.Router();

// Bank details routes
bankDetailsRouter.post("/", saveBankDetails);
bankDetailsRouter.get("/:studentId", getBankDetails);

export default bankDetailsRouter; 