import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/reimb`;

// Add auth token to requests
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const reimbService = {
    // Create a new reimbursement document
    createReimbDocument: async (reimbData) => {
        try {
            const formData = new FormData();
            
            // Append files if they exist
            if (reimbData.bills && reimbData.bills.length > 0) {
                reimbData.bills.forEach((file) => {
                    formData.append('bills', file);
                });
            }
            
            // Append other data
            formData.append('studentId', reimbData.studentId);
            formData.append('eventDetails', JSON.stringify(reimbData.eventDetails));
            formData.append('bankDetails', JSON.stringify(reimbData.bankDetails));
            formData.append('reimbursementItems', JSON.stringify(reimbData.reimbursementItems));

            if (reimbData.rejectionRemarks) {
                formData.append('rejectionRemarks', reimbData.rejectionRemarks);
            }

            const response = await axios.post(
                `${API_URL}/create`, 
                formData,
                {
                    ...getAuthHeader(),
                    headers: {
                        ...getAuthHeader().headers,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get all reimbursement documents for a student
    getStudentReimbDocuments: async (studentId) => {
        try {
            const response = await axios.get(
                `${API_URL}/student/${studentId}`,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get a single reimbursement document by ID
    getReimbDocumentById: async (documentId) => {
        try {
            const response = await axios.get(
                `${API_URL}/${documentId}`,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete a reimbursement document
    deleteReimbDocument: async (documentId) => {
        try {
            const response = await axios.delete(
                `${API_URL}/${documentId}`,
                getAuthHeader()
            );
            toast.success("Reimbursement document deleted successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to delete reimbursement document";
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            throw errorMessage;
        }
    },

    // Update a reimbursement document
    updateReimbDocument: async (documentId, reimbData) => {
        try {
            const formData = new FormData();
            
            // Append files if they exist
            if (reimbData.bills && reimbData.bills.length > 0) {
                reimbData.bills.forEach((file) => {
                    formData.append('bills', file);
                });
            }
            
            // Append other data
            if (reimbData.eventDetails) {
                formData.append('eventDetails', JSON.stringify(reimbData.eventDetails));
            }
            if (reimbData.bankDetails) {
                formData.append('bankDetails', JSON.stringify(reimbData.bankDetails));
            }
            if (reimbData.reimbursementItems) {
                formData.append('reimbursementItems', JSON.stringify(reimbData.reimbursementItems));
            }
            if (reimbData.rejectionRemarks) {
                formData.append('rejectionRemarks', reimbData.rejectionRemarks);
            }
            if (reimbData.staffStatus) {
                formData.append('staffStatus', reimbData.staffStatus);
            }

            const response = await axios.patch(
                `${API_URL}/${documentId}`,
                formData,
                {
                    ...getAuthHeader(),
                    headers: {
                        ...getAuthHeader().headers,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};
