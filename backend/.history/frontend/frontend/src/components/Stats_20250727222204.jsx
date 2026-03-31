import React, { useEffect, useState } from 'react'

function Stats() {

    const [doctorsCount,setDoctorsCount] = useState(0)
    const [departmentsCount, setDepartmentsCount] = useState(0);
    useEffect(()=>{
        const fetchStats= async()=>{
            try {
                const doctorsStats= await fetch("http://localhost:5000/doctors/count")

                const departmentsStats= await fetch("http://localhost:5000/departments/count")

                const  doctorsData = await doctorsStats.json()

                 const  departmentsData = await departmentsStats.json()

                 setDoctorsCount(doctorsData.count || 0)
                 setDepartmentsCount(departmentsData.count || 0);

                 


            } catch (error) {
                  console.error("Error fetching stats:", error);
            }
        }
        
    fetchStats();
    },[])
  return (
    <div>Stats</div>
  )
}

export default Stats