import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
function AddDoctor() {
    const {user} = useContext(AuthContext)

  return (
    <div  className="flex justify-center items-center h-screen bg-gray-100">
        <form className='bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl flex gap-8' encType="multipart/form-data">
           <div className="flex flex-col items-center w-1/3">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300 mb-4">
           
              <img  alt="Preview" className="object-cover w-full h-full" />
            
              <img src="./img/doctors/avatar.png" alt="Default Avatar" className="object-cover w-full h-full" />
            
          </div>
          <button className="cursor-pointer  text-white px-4 py-2 rounded ">
            Choose Image
            <input type="file" name="image" onChange={handleChange} accept="image/*" className="hidden" />
          </button>
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