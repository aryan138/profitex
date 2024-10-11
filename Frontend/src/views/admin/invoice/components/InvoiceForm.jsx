
import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for API calls

// Zod schema for validation
const invoiceSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  customerEmail: z.string().email("Invalid email address"),
  customerAddress: z.string().min(1, "Customer address is required"),
  fromName: z.string().min(1, "Sender's name is required"),
  fromEmail: z.string().email("Invalid email address"),
  fromAddress: z.string().min(1, "Sender's address is required"),
  items: z.array(
    z.object({
      itemName: z.string().min(1, "Item name is required"),
      description: z.string().optional(),
      quantity: z.number().positive(),
      price: z.number().positive(),
    })
  ).min(1, "At least one item is required"),
});

const InvoiceForm = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      items: [{ itemName: '', description: '', quantity: 1, price: 1.0 }]
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items"
  });

  const [invoiceNumber] = useState(1);
  const [currentDate] = useState(new Date().toLocaleDateString());
  const [dueDate, setDueDate] = useState('');
  const Navigate = useNavigate();

  // Updated onSubmit function to include API call
  const onSubmit = async (data) => {
    try {
      // Make API call to submit the invoice data
      const response = await axios.post(process.env.REACT_APP_API_URL + '/invoice/new-invoice', {
        ...data,
        invoiceNumber,   // Add invoice number to the data
        dueDate          // Include due date
      });
      console.log("Invoice Submitted:", response.data); // Log response from server
      Navigate('/admin/invoice');
      // Optionally reset the form or show a success message
    } catch (error) {
      console.error("Error submitting invoice:", error);
      // Optionally handle error (e.g., show a message to the user)
    }
  };

  const calculateSubtotal = () => {
    return fields.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2);
  };

  return (
    <div className="bg-white p-8 max-w-4xl h-[90vh] mt-10 mx-auto rounded-lg shadow-md overflow-y-scroll">
      <h2 className="text-2xl font-bold mb-4">Invoice</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Invoice Details */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p><strong>Current Date:</strong> {currentDate}</p>
            <label className="block text-gray-700">Due Date:</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Invoice Number:</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg "
            />
          </div>
        </div>

        {/* Bill To and Bill From */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Bill To */}
          <div>
            <h3 className="text-lg font-semibold">Bill to:</h3>
            <input
              type="text"
              placeholder="Who is this invoice to?"
              {...register('customerName')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
            />
            {errors.customerName && <p className="text-red-500">{errors.customerName.message}</p>}
            <input
              type="email"
              placeholder="Email address"
              {...register('customerEmail')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
            />
            {errors.customerEmail && <p className="text-red-500">{errors.customerEmail.message}</p>}
            <input
              type="text"
              placeholder="Billing address"
              {...register('customerAddress')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            {errors.customerAddress && <p className="text-red-500">{errors.customerAddress.message}</p>}
          </div>

          {/* Bill From */}
          <div>
            <h3 className="text-lg font-semibold">Bill from:</h3>
            <input
              type="text"
              placeholder="Who is this invoice from?"
              {...register('fromName')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
            />
            {errors.fromName && <p className="text-red-500">{errors.fromName.message}</p>}
            <input
              type="email"
              placeholder="Email address"
              {...register('fromEmail')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
            />
            {errors.fromEmail && <p className="text-red-500">{errors.fromEmail.message}</p>}
            <input
              type="text"
              placeholder="Billing address"
              {...register('fromAddress')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            {errors.fromAddress && <p className="text-red-500">{errors.fromAddress.message}</p>}
          </div>
        </div>

        {/* Items Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">ITEM</h3>
          {fields.map((item, index) => (
            <div key={item.id} className="grid grid-cols-5 gap-4 mb-2">
              <input
                type="text"
                placeholder="Item name"
                {...register(`items.${index}.itemName`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Item description"
                {...register(`items.${index}.description`)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                placeholder="Qty"
                {...register(`items.${index}.quantity`, { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                step="0.01"
                placeholder="Price"
                {...register(`items.${index}.price`, { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-500 hover:text-red-700"
              >
                delete
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => append({ itemName: '', description: '', quantity: 1, price: 1.0 })}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Add Item
          </button>
        </div>

        {/* Subtotal, Discount, Tax, Total */}
        <div className="mt-4">
          <p><strong>Subtotal:</strong> ${calculateSubtotal()}</p>
          <p><strong>Discount:</strong> 0%</p>
          <p><strong>Tax:</strong> 0%</p>
          <p className="text-xl font-bold"><strong>Total:</strong> ${calculateSubtotal()}</p>
        </div>

        {/* Notes */}
        <div className="mt-4">
          <label className="block text-gray-700">Notes:</label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="Thanks for your business!"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg">
          Submit Invoice
        </button>
      </form>
    </div>
  );
};

export default InvoiceForm;
