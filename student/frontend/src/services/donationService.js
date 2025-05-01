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

export const donationService = {
    // Create a new document
    createDonation: async (donationData) => {
        try {
            const formData = new FormData();
            
            // Append file if it exists
            if (donationData.file) {
                formData.append('document', donationData.file);
            }
            
            // Append other data
            formData.append('studentId', donationData.studentId);
            formData.append('donationDetails', JSON.stringify({
                eventName: donationData.eventName,
                companyName: donationData.companyName,
                contactNumber: donationData.contactNumber,
                panCard: donationData.panCard,
                bankName: donationData.bankName,
                amount: donationData.amount
            }));

            const response = await axios.post(
                `${API_URL}/documents/create`, 
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

    // Get all documents for a student
    getStudentDonations: async (studentId) => {
        try {
            const response = await axios.get(
                `${API_URL}/documents/student/${studentId}?type=donation`,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get a single document by ID
    getDonationById: async (documentId) => {
        try {
            const response = await axios.get(
                `${API_URL}/documents/${documentId}`,
                getAuthHeader()
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete a document
    deleteDonation: async (documentId) => {
        try {
            const response = await axios.delete(
                `${API_URL}/documents/${documentId}`,
                getAuthHeader()
            );
            toast.success("Document deleted successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Failed to delete document";
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

    // Upload donation document
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

    // Update a document
    updateDonation: async (documentId, formData) => {
        try {
            const response = await axios.patch(
                `${API_URL}/documents/${documentId}`,
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