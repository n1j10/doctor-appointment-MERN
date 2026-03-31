import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
function AddDoctor() {
    const {user} = useContext(AuthContext)

  return (
    <div  className="flex justify-center items-center h-screen bg-gray-100">
        <form className='bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl flex gap-8' encType="multipart/form-data">
            <div className='flex flex-col items-center w-1/3'>
                <img src="./img/doctors/avatar.png"/>

                 <button>Choose Image</button>
            <input type='file' accept="image/*" className='hidden'/>
            </div>

            <div className="w-2/3">


            </div>
           
        </form>
    </div>
  )
}

export default AddDoctor