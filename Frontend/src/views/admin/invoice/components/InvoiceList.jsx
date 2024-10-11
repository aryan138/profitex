// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Header from './Header';

// const InvoiceList = () => {
//   const [invoices, setInvoices] = useState([]); // State to store the list of invoices
//   const [loading, setLoading] = useState(true); // State for loading status
//   const [error, setError] = useState(null); // State for any error

//   // Fetch invoices when the component mounts
//   useEffect(() => {
//     const fetchInvoices = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/invoice/invoices');
//         setInvoices(response.data); // Set invoices to the response data
//         setLoading(false); // Loading is done
//       } catch (err) {
//         setError('Error fetching invoices');
//         setLoading(false);
//       }
//     };

//     fetchInvoices(); // Call the function to fetch invoices
//   }, []);

//   // If there's an error, display it
//   if (error) {
//     return(
//       <div>
//       <Header/>
//         <p className='mt-10'>{error}</p>
//       </div>
//     ) 
//   }

//   // If data is still loading, show a loading message
//   if (loading) {
//     return <p>Loading invoices...</p>;
//   }

//   return (
//     <div className="container mx-auto mt-5">
//       <Header len={invoices.length} /> {/* Pass the length of invoices to the Header */}

//       <div className="mt-5 rounded-md px-12 py-5 w-full bg-white flex flex-col gap-4 overflow-y-scroll">
//         {invoices.length > 0 ? (
//           invoices.map((invoice, index) => (
//             <div key={index} className="border-b border-gray-300 py-4">
//               <p><strong>Invoice Number:</strong> {invoice.invoiceNumber}</p>
//               <p><strong>Customer Name:</strong> {invoice.customerName}</p>
//               <p><strong>Date:</strong> {invoice.date}</p>
//               <p><strong>Total Amount:</strong> ${invoice.total}</p>
//             </div>
//           ))
//         ) : (
//           <p>No invoices found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InvoiceList;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]); // State to store the list of invoices
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for any error

  // Fetch invoices when the component mounts
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/invoice/invoices');
        setInvoices(response.data); // Set invoices to the response data
        setLoading(false); // Loading is done
      } catch (err) {
        setError('Error fetching invoices');
        setLoading(false);
      }
    };

    fetchInvoices(); // Call the function to fetch invoices
  }, []);

  // If there's an error, display it
  if (error) {
    return (
      <div>
        <Header />
        <p className="mt-10">{error}</p>
      </div>
    );
  }

  // If data is still loading, show a loading message
  if (loading) {
    return <p>Loading invoices...</p>;
  }

  return (
    <div className="container mx-auto mt-5 px-4">
      <Header len={invoices.length} /> {/* Pass the length of invoices to the Header */}

      <div className="mt-5 bg-white rounded-lg shadow-md">
        <table className="w-full table-auto">
          <thead className="bg-white">
            <tr>
              <th className="px-4 py-2 text-left text-gray-500">INVOICE ID</th>
              <th className="px-4 py-2 text-left text-gray-500">CUSTOMER NAME</th>
              <th className="px-4 py-2 text-left text-gray-500">DATE</th>
              <th className="px-4 py-2 text-left text-gray-500">STATUS</th>
              <th className="px-4 py-2 text-left text-gray-500">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? (
              invoices.map((invoice, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2 text-gray-800">{(Math.random() * 10000000).toFixed() + invoice.invoiceNumber}</td>
                  <td className="px-4 py-2 text-gray-800">{invoice.customerName}</td>
                  <td className="px-4 py-2 text-gray-800">{invoice.date}</td>
                  <td className="px-4 py-2 text-gray-800">{invoice.status}</td>
                  <td className="px-4 py-2 text-gray-800">${invoice.total}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;
