import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'

function MyAppointments() {
  const {user} = useContext(AuthContext)
  const [appointments, setAppointments] = useState([])

  const [error,setError] = useState(null)


  useEffect(()=>{

    const fetchAppointmens = async()=> {
  try {
        const token = localStorage.getItem("token")
        const res = await fetch("http://localhost:5000/appointments/myAppointments",{
          headers:{Authorization: `Bearer ${token}`}

        })
        const data = await res.json()
         if (!res.ok) throw new Error(data.message || "Failed to fetch appointments");
         setAppointments(data);
      } catch (error) {
        console.error(error);
        setError(error.message)

    }
    }

    fetchAppointmens();
    
  },[])

  const cancelAppointment = async(id) => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`http://localhost:5000/appointments/${id}`,{
        method:"POST",
         headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      })
        const data = await res.json();

         if (!res.ok) throw new Error(data.message || "Failed to delete appointment");


    } catch (error) {
       console.error(error);
       alert(`Error cancelling appointment: ${error.message}`);
    }
  }
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
        <h2 className='text-3xl font-bold text-center mb-8 text-[#008e9b]'>My Appointments</h2>

        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

        <div className='space-y-6 max-w-3xl mx-auto'>
            {appointments?.length === 0 ? (
         <p className="text-center text-gray-500">No appointments found</p>
            ): (
              appointments?.map((app)=> (
                <div key={app?._id} className="flex items-center justify-between bg-white shadow p-4 rounded-lg">

                  <div className='flex  items-center gap-4'>


                    <img className='w-20 h-20 rounded-full object-cover border' src={`http://localhost:5000/uploads/${app?.doctor?.image}`}/>

                  <div>

                     <h3 className="text-xl font-semibold">{app.doctor?.name}</h3>
                  <p className="text-gray-600">{app.reason}</p>
              <p>{new Date(app?.date).toLocaleDateString()}</p>
               
                  </div>
                  </div>

                  <button onClick={()=> {if(window.confirm("Are you sure you want to cancel this appointment?")){
                    cancelAppointment(app?._id);
                   }} }></button>
                  
                  </div>
              ))
            )}
        </div>

    </div>
  )
}

export default MyAppointments