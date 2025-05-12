import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

// Add auth token to requests
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const gstService = {
    // Create a new GST document
    createGstDocument: async (gstData) => {
        try {
            const formData = new FormData();
            
            // Append file if it exists
            if (gstData.file) {
                formData.append('document', gstData.file);
            }
            
            // Append other data
            formData.append('studentId', gstData.studentId);
            formData.append('gstDetails', JSON.stringify({
                eventName: gstData.eventName,
                companyName: gstData.companyName,
                contactNumber: gstData.contactNumber,
                panCard: gstData.panCard,
                gstNumber: gstData.gstNumber,
                billingAddress: gstData.billingAddress,
                bankName: gstData.bankName,
                amount: gstData.amount
            }));

            if (gstData.rejectionRemarks) {
                formData.append('rejectionRemarks', gstData.rejectionRemarks);
            }

            const response = await axios.post(
                `${API_URL}/gst/create`, 
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

    // Get all GST documents for a student
    getStudentGstDocuments: async (studentId) => {
        try {
            const response = await axios.get(
                `${API_URL}/gst/student/${studentId}`,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get a single GST document by ID
    getGstDocumentById: async (documentId) => {
        try {
            const response = await axios.get(
                `${API_URL}/gst/${documentId}`,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete a GST document
    deleteGstDocument: async (documentId) => {
        try {
            const response = await axios.delete(
                `${API_URL}/gst/${documentId}`,
                getAuthHeader()
            );
            toast.success("GST document deleted successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to delete GST document";
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

    // Upload GST document
    uploadDocument: async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            
            const response = await axios.post(`${API_URL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update a GST document
    updateGstDocument: async (documentId, formData) => {
        try {
            const response = await axios.patch(
                `${API_URL}/gst/${documentId}`,
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
