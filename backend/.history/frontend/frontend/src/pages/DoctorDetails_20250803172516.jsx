import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function DoctorDetails() {

     const { id } = useParams();

     const [doctor, setDoctor] = useState(null);



        useEffect(()=>{
            const fetchedDoctors = async()=>{
                try {
                    const res = await fetch(                   `http://localhost:5000/doctors/${id}`)
                    const data = await res.json()
                    if(!res.ok) throw new Error(data.message || "Failed to fetch doctors")
                        setDoctor(data.slice(0,3))
                } catch (error) {
                        console.error(error)
                }
            }
             fetchedDoctors();
        },[id])
  return (
    <div className='flex flex-col md:flex-row items-center max-w-5xl  mx-auto p-8 bg-gray-50 min-h-screen'>
        <img src={`http://localhost:5000/uploads/${doctor?.image}`} className='w-64 h-64 object-cover rounded-lg shadow-md mb-6 md:mb-0 md:mr-10'/>

         <div className='space-y-4'>
            <h2 className='text-4xl font-bold text-[#008e9b]'>{doctor?.name}</h2>
            <p className='text-xl text-gray-700'>{doctor?.specialty}</p>
            <p className='text-gray-600'>{doctor?.experienceYears}</p>

            <p>{doctor?.description}</p>
            </div>   
    </div>
  )
}

export default DoctorDetails