import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({len}) => {
  return (
    <div className='main-container w-full h-auto flex justify-between'>
        <div className="invoice flex flex-col">
            <p className='text-3xl font-bold'>Invoices</p>
            <p className='text-sm'>there are total {len} invoices</p>
        </div>
        <div className="options flex flex-wrap justify-between gap-4 items-center">
            <div className="filter">
                <button className='bg-blueSecondary p-1.5 rounded-full text-white'><p>Filter by status </p></button>
                
            </div>
            <div className="newInvoice">
                <Link to={'/admin/invoice/form'}><button className='w-auto h-auto bg-blueSecondary rounded-full p-2 text-white'>New Invoice</button></Link>
            </div>
        </div>
      
    </div>
  )
}

export default Header
