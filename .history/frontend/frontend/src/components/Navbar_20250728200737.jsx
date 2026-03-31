import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    
    // قراءة بيانات المستخدم من localStorage
    const tokenData = localStorage.getItem("userRole"); 
    if (tokenData) {
      setRole(tokenData); // مثلاً: "admin" أو "user"
      console.log(tokenData)
    }
  }, []);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-lg flex items-center justify-between">
      <div className="font-bold text-xl">
        <a to="/">Medicio</a>
      </div>
      <ul className="flex space-x-6">
        <li><a to="/">Home</a></li>
        <li><a to="/about">About</a></li>

        {role === "admin" && (
          <>
            <li><a to="/add-department">Add Department</a></li>
            <li><a to="/add-doctor">Add Doctor</a></li>
          </>
        )}

        {role === "user" && (
          <li><a to="/add-appointment">Add Appointment</a></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
