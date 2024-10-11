// components/ExcelUpload.js
import React, { useState } from "react";

const ExcelUpload = ({ onClose }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/upload-excel', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        console.log('Server response:', result);
        // Handle the response as needed
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className="w-full bg-white rounded-lg p-5">
      <h3 className="text-lg font-bold mb-4">Upload Excel File</h3>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        className="block w-full mt-2"
      />
      <button
        onClick={handleFileUpload}
        className="w-full bg-[#4318FF] text-white py-2 px-4 rounded-lg mt-4"
      >
        Upload Excel File
      </button>
    </div>
  );
};

export default ExcelUpload;
