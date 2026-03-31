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
    })
  return (
    <div></div>
  )
}

export default Departments