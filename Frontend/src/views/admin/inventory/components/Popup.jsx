import React, { useState, useRef, useEffect } from "react";
import ExcelUpload from "./ExcelUpload";

const Popup = ({ closePopup, handleAddManually }) => {
  const [isExcelUpload, setIsExcelUpload] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        closePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closePopup]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div
        ref={popupRef}
        className="relative w-1/3 rounded-lg p-5 bg-[#4318FF]"
      >
        {isExcelUpload ? (
          <ExcelUpload onClose={() => setIsExcelUpload(false)} />
        ) : (
          <>
            <h3 className="text-lg font-bold text-white">Add Product</h3>
            <div className="mt-4">
              <button
                onClick={handleAddManually}
                className="w-full bg-white text-[#4318FF] font-[600] py-2 px-4 rounded-lg mb-2"
              >
                Add Manually
              </button>
              <button
                onClick={() => setIsExcelUpload(true)}
                className="w-full bg-white text-[#4318FF] font-[600] py-2 px-4 rounded-lg"
              >
                Add by Excel
              </button>
            </div>
          </>
        )}
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-3xl p-2 mr-4"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Popup;
