import Donation from "../models/Document.js"; // or your actual donation model
import GstDocuments from "../models/GstDocuments.js";
import ReimbDocuments from "../models/ReimbDocuments.js";

// Get all document types for a student
export const getAllDocumentsForStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Fetch all documents for this student
    const [donationDocuments, gstDocuments, reimbursementDocuments] = await Promise.all([
      Donation.find({ studentId }),
      GstDocuments.find({ studentId }),
      ReimbDocuments.find({ studentId }),
    ]);

    res.json({
      success: true,
      data: {
        donationDocuments,
        gstDocuments,
        reimbursementDocuments,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch all documents for student.",
      error: error.message,
    });
  }
};
