import React, { useEffect } from 'react'

function AddAppointment() {

     const [doctors, setDoctors] = useState([]);
     const [form,setForm] = useState({
        doctor:"",
        date: "",
        reason: "",
     })

     useEffect(()=>{
        const fetchDoctor = async()=>{
            const res = await fetch("http://localhost:5000/doctors/allDoctors")
            const data = await res.json()
            setDoctors(data)
        }

        fetchDoctor();

    

     },[])
  return (
    <div>
        
    </div>
  )
}

export default AddAppointment