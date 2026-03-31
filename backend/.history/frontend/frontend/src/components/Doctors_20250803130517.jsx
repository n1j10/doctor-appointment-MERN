import React, { useEffect, useState } from 'react'

function Doctors() {
    const [doctors,setDoctors] = useState([])
    useEffect(()=>{
        const fetchedDoctors = async()=>{
            try {
                const res = await fetch("http://localhost:5000/doctors/allDoctors")
                const data = await res.json()
                if(!res.ok) throw new Error(data.message || "Failed to fetch doctors")
                    setDoctors(data.slice(0,3))
            } catch (error) {
                    console.error(error)
            }
        }
         fetchedDoctors();
    },[])
  return (
    <div>Doctors</div>
  )
}

export default Doctors