const express = require('express');
const router = express.Router();
const {
  createInvoice,
  getInvoiceById,
  getAllInvoices,
  updateInvoice,
  deleteInvoice
} = require('../controllers/invoiceController');
const { verifyJwt } = require('../middlewares/authorize');
router.post('/new-invoice',createInvoice);
router.get('/invoices/:id', getInvoiceById);
router.get('/invoices', getAllInvoices);
router.put('/invoices/:id',updateInvoice);
router.delete('/invoices/:id', deleteInvoice);

module.exports = router;
