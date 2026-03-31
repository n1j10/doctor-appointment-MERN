import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className='bg-white shadow-md text-[#008e9b] flex justify-between'>
        <div >
            <img className='w-32' src='./logo.png'/>
        </div>

        <ul className='flex space-x-6 items-center px-4 h-10'>
                <li><Link to="/">Home</Link></li>
                 <li><Link to="/">Services</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar