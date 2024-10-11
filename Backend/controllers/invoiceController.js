const Invoice = require('../models/invoices.js');  


// const createInvoice = async (req, res) => {
//     try {
//       const {
//         invoiceNumber,
//         dueDate,
//         customerName,
//         customerEmail,
//         customerAddress,
//         fromName,         
//         fromEmail,        
//         fromAddress,      
//         items,
//         notes,
//       } = req.body;
  
//       // Calculate total from items if needed
//       const total = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  
//       const newInvoice = new Invoice({
//         invoiceNumber,
//         dueDate,
//         customerName,
//         customerEmail,
//         customerAddress,
//         fromName,        
//         fromEmail,       
//         fromAddress,     
//         items,
//         total,           
//         notes,
//       });
  
//       const savedInvoice = await newInvoice.save();
//       res.status(201).json(savedInvoice); 
//     } catch (error) {
//       console.error("Error creating invoice:", error); 
//       res.status(500).json({ message: 'Error creating invoice', error: error.message });
//     }
//   };

const createInvoice = async (req, res) => {
  try {
    const {
      invoiceNumber,
      dueDate,
      customerName,
      customerEmail,
      customerAddress,
      senderName,   // Updated to match schema
      senderEmail,  // Updated to match schema
      senderAddress,// Updated to match schema
      items,
      notes,
    } = req.body;

    // Calculate total from items
    const total = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

    // Create new invoice
    const newInvoice = new Invoice({
      invoiceNumber,
      dueDate,
      customerName,
      customerEmail,
      customerAddress,
      senderName,    // Updated to match schema
      senderEmail,   // Updated to match schema
      senderAddress, // Updated to match schema
      items,
      total,         // Set calculated total
      notes,
    });

    // Save the new invoice to the database
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice); // Return the saved invoice
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ message: 'Error creating invoice', error: error.message });
  }
};



const getInvoiceById = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json(invoice);  
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving invoice', error });
  }
};


const getAllInvoices = async (req, res) => {
  try {
    console.log("insie all invoices");
    const invoices = await Invoice.find();
    res.status(200).json(invoices);  
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving invoices', error });
  }
};


const updateInvoice = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const updatedInvoice = await Invoice.findByIdAndUpdate(invoiceId, req.body, { new: true });

    if (!updatedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json(updatedInvoice);  
  } catch (error) {
    res.status(500).json({ message: 'Error updating invoice', error });
  }
};


const deleteInvoice = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);

    if (!deletedInvoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json({ message: 'Invoice deleted successfully' });  
  } catch (error) {
    res.status(500).json({ message: 'Error deleting invoice', error });
  }
};

module.exports = {
  createInvoice,
  getInvoiceById,
  getAllInvoices,
  updateInvoice,
  deleteInvoice,
};
