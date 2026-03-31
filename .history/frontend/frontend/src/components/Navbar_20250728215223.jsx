import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
    const {user, logout} = useContext(AuthContext)
  return (
    <nav className='bg-white shadow-md text-[#008e9b] flex justify-between'>
        <div >
            <img className='w-32' src='./logo.png'/>
        </div>

        <ul className='flex space-x-6 items-center px-4'>
                <li><Link to="/">Home</Link></li>
                 <li><Link to="/">Services</Link></li>

                  <li><Link to="/">About</Link></li>

                  {user?.role === "admin" &&(
                    <>
                 <li><Link to="/">Add Doctor</Link></li>
                 <li><Link to="/">Add Department</Link></li>
                    </>
                  )}

                  {user?.role === "user" &&  <li><Link to="/">Add Appointment</Link></li>}

                  {!user &&(
                    <>
                     <li><Link to="/login">Login</Link></li>
                 <li><Link to="/register">Register</Link></li>
                    </>
                  )}

                  {user && <li><button onClick={logout}>logout</button></li>}


        </ul>
    </nav>
  )
}

export default Navbar