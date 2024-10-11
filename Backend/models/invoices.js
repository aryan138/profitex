const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: { type: Number, required: true}, 
  currentDate: { type: Date, default: Date.now },   
  dueDate: { type: Date, required: true }, 
  
  // Customer Details
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerAddress: { type: String, required: true },
  
  // Sender Details (Optional with Default Value)
  senderName: { type: String, required: true, default: 'Unknown Sender' },
  senderEmail: { type: String, required: true, default: 'no-reply@example.com' },
  senderAddress: { type: String, required: true, default: 'No address provided' },

  // Items: array of objects
  items: [
    {
      itemName: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],

  // Total amount
  total: { type: Number, required: true },  
  // Notes
  notes: { type: String },
  status: { type: String, default: 'paid' }
});

// Create a model from the schema
const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
