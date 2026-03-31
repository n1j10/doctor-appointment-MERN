import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
function AddDoctor() {
    const {user} = useContext(AuthContext)
    const [preview,setPreview] = useState(null)

    const [error,setError]=useState(null)
    const [form,setForm] = useState({
            name: "",
            specialty: "",
            experienceYears: "",
            description: "",
            image:null,

        

    })

    const handleChange=(e)=>{
        const {name,value,files}= e.target

        if(files){
            const file = files[0]
            setForm({...form,image:file})
            setPreview(URL.createObjectURL(file));


        }

    }

  return (
    <div  className="flex justify-center items-center h-screen bg-gray-100">
        <form className='bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl flex gap-8' encType="multipart/form-data">
            <div className='flex flex-col items-center w-1/3'>
                    <div className='w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300'>
                
                <img src="./img/doctors/avatar.png"/>

                 
                 </div>
                 <button className='mt-4'>Choose Image</button>
            <input onChange={handleChange} type='file' accept="image/*" className='hidden'/>
            </div>

            <div className="w-2/3">
                   <h2 className="text-2xl font-bold mb-6 text-[#008e9b] text-center">Add New Doctor</h2>

              <label className="block mb-2 font-semibold">Name</label>

              <input value={form.name} onChange={handleChange} type='text' name="name"  required className="w-full mb-4 p-2 border rounded"/>


                  <label className="block mb-2 font-semibold">Specialty</label>

              <input value={form.specialty} onChange={handleChange} type='text' name="specialty"  required className="w-full mb-4 p-2 border rounded"/>



                  <label className="block mb-2 font-semibold">Experience Years</label>

              <input value={form.experienceYears} onChange={handleChange} type='text' name="experienceYears"  required className="w-full mb-4 p-2 border rounded"/>


                <label className="block mb-2 font-semibold">Description</label>

              <input value={form.description} type='text' name="description"  required className="w-full mb-4 p-2 border rounded"/>




            </div>
           
        </form>
    </div>
  )
}

export default AddDoctor