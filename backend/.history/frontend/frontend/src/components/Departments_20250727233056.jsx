import React, { useEffect, useState } from 'react'

function Departments() {

    const [departments, setDepartments] = useState([]);
    const [activeTab,setActiveTab] = useState(null)


    useEffect(()=>{
       fetch("http://localhost:5000/departments/allDepartments")  
       .then((res)=>res.json())
       .then((data)=>{
        setDepartments(data)
        if(data.length>0)setActiveTab(data[0]._id)

       })   
        .catch((err) => console.error("Failed to fetch departments", err));
    },[])

    const handleTabClick=(id)=>{
        setActiveTab(id)
    }
  return (
    <section className=" py-12 bg-white max-w-6xl mx-auto px-4">
        <div className='mb-8 text-center'>
            <h2 className="text-3xl font-bold mb-2">Departments</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
            Explore our specialized medical departments staffed with expert doctors.
            </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
              {/* Tabs List */}

          <ul className='flex md:flex-col space-x-4 md:space-x-0 border-b md:border-b-0 md:border-r  border-gray-300'>

            {departments.map((dep)=>{
                <li key={dep._id}>
                    <button onClick={() => handleTabClick(dep._id)} className={`block px-4 py-2 rounded-t md:rounded-tr-none  md:rounded-1 ${activeTab===dep._id ? "bg-#[#008e9b] text-white":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>



                   
                    </button>    
                </li>
            })}
            
            </ul>    
        </div>



    </section >
  )
}

export default Departments