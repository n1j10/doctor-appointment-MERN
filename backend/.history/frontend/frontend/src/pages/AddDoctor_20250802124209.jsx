import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
function AddDoctor() {
    const {user} = useContext(AuthContext)

  return (
    <div  className="flex justify-center items-center h-screen bg-gray-100">
        <form className='bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl flex gap-8' encType="multipart/form-data">
            <div className='flex flex-col items-center w-1/3'>
                
                
                <img src="./img/doctors/avatar.png"/>

                 <button className='mt-4'>Choose Image</button>
            <input type='file' accept="image/*" className='hidden'/>
            </div>

            <div className="w-2/3">
                   <h2 className="text-2xl font-bold mb-6 text-[#008e9b] text-center">Add New Doctor</h2>

              <label className="block mb-2 font-semibold">Name</label>

              <input type='text' name="name"  required className="w-full mb-4 p-2 border rounded"/>


                  <label className="block mb-2 font-semibold">Specialty</label>

              <input type='text' name="Specialty"  required className="w-full mb-4 p-2 border rounded"/>



                  <label className="block mb-2 font-semibold">Experience Years</label>

              <input type='text' name="experienceYears"  required className="w-full mb-4 p-2 border rounded"/>


                <label className="block mb-2 font-semibold">Description</label>

              <input type='text' name="description"  required className="w-full mb-4 p-2 border rounded"/>




            </div>
           
        </form>
    </div>
  )
}

export default AddDoctor