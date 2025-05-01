import express from "express";
import { saveBankDetails } from "../controllers/BankDetailsController.js";

const bankDetailsRouter = express.Router();

// Bank details routes
bankDetailsRouter.post("/", saveBankDetails);

export default bankDetailsRouter; 