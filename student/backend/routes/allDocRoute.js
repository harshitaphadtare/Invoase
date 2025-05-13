import express from "express";
import { getAllDocumentsForStudent } from "../controllers/AllDocumentController.js";

const router = express.Router();

router.get("/all/:studentId", getAllDocumentsForStudent);

export default router;
