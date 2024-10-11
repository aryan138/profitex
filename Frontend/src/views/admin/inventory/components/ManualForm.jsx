import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

const ManualForm = ({ closeForm }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const formRef = useRef(null);

  const onSubmit = (data) => {
    console.log(data);
    // Add your submit logic here
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        closeForm();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeForm]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div ref={formRef} className="relative w-1/3 bg-white rounded-lg p-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-lg font-bold mb-4">Add Product Manually</h3>

          <label className="block mt-4">
            Product ID
            <input
              type="text"
              {...register("item_id", { required: true })}
              className="block w-full mt-1 p-2 border rounded"
            />
            {errors.item_id && <p className="text-red-500 text-sm">Product ID is required</p>}
          </label>

          <label className="block mt-4">
            Product Name
            <input
              type="text"
              {...register("item_name", { required: true })}
              className="block w-full mt-1 p-2 border rounded"
            />
            {errors.item_name && <p className="text-red-500 text-sm">Product Name is required</p>}
          </label>

          <label className="block mt-4">
            Product Quantity
            <input
              type="number"
              {...register("item_quantity", { required: true })}
              className="block w-full mt-1 p-2 border rounded"
            />
            {errors.item_quantity && <p className="text-red-500 text-sm">Product Quantity is required</p>}
          </label>

          <label className="block mt-4">
            Inventory Branch ID
            <input
              type="text"
              {...register("inventoryBranch", { required: true })}
              className="block w-full mt-1 p-2 border rounded"
            />
            {errors.inventoryBranch && <p className="text-red-500 text-sm">Inventory Branch ID is required</p>}
          </label>

          <button
            type="submit"
            className="mt-4 w-full bg-[#4318FF] text-white py-2 px-4 rounded-lg"
          >
            Submit
          </button>
        </form>
        <button
          type="button"
          onClick={closeForm}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl p-2"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ManualForm;
