import React, { useState, useRef } from "react";
import { FiUpload, FiX, FiFile } from "react-icons/fi";
import axios from "axios";

const BillUploader = ({ documentId, onUploadSuccess, onUploadError }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter((file) => {
      const isValid = ["image/jpeg", "image/png", "application/pdf"].includes(
        file.type
      );
      if (!isValid) {
        setError(
          `${file.name} is not a valid file type. Only JPG, PNG and PDF are allowed.`
        );
      }
      return isValid;
    });
    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    setError("");
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select at least one file");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("bill", file);
        formData.append("documentId", documentId);
        formData.append("vendorName", "Vendor"); // You might want to make this dynamic
        formData.append("billDate", new Date().toISOString());
        formData.append("amount", "0"); // You might want to make this dynamic

        const response = await axios.post("/api/bills/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
      });

      const results = await Promise.all(uploadPromises);
      setFiles([]);
      onUploadSuccess?.(results);
    } catch (err) {
      console.error("Upload failed:", err);
      setError(err.response?.data?.message || "Failed to upload files");
      onUploadError?.(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept=".jpg,.jpeg,.png,.pdf"
          multiple
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            disabled={uploading}
          >
            <FiUpload />
            <span>Select Files</span>
          </button>
          <p className="text-sm text-gray-500">
            Supported formats: JPG, PNG, PDF (max 5MB)
          </p>
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <div className="flex items-center space-x-2">
                  <FiFile className="text-gray-500" />
                  <span className="text-sm truncate max-w-xs">{file.name}</span>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700"
                  disabled={uploading}
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

      <button
        onClick={handleUpload}
        disabled={files.length === 0 || uploading}
        className={`w-full py-2 px-4 rounded ${
          files.length === 0 || uploading
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 text-white"
        } transition-colors`}
      >
        {uploading ? "Uploading..." : "Upload Files"}
      </button>
    </div>
  );
};

export default BillUploader;
